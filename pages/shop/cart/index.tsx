import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

// mui
import {
  useTheme, Container, Box, Grid, Stack,
  Card, CardMedia, CardContent, CardActionArea, CardHeader,
  Typography, IconButton, Button, Badge, Modal
} from "@mui/material";

// mui icons
import { 
  ShoppingCartOutlined, ShoppingCart, 
  OnlinePrediction, Delete
} from "@mui/icons-material";

import { _product_ } from "../../../src/typeModel";
import { getLocalStorage, setLocalStorage } from "../../../src/serviceFunctions/storeage";
import { sanitizedString } from "../../../src/serviceFunctions/resources";
import CheckOutView from "../../../src/Components/shop/checkOutView";

const Cart: NextPage = () => {
  const [cart, setCart] = useState<_product_[]>([]);

  const [openCheckboxModal, setOpenCheckboxModal] = useState(false);
  const handleOpenCheckboxModal = () => setOpenCheckboxModal(true);
  const handleCloseCheckboxModal = () => setOpenCheckboxModal(false);
  useEffect(
    () => {
      console.log("testing");
      
      if (!cart.length) {
        getLocalStorage("cart").then((res: any) => {
          // console.log(res);
          if (res && res.length) {
            setCart(res);
          }
        });
      }
    }, []
  );

  useEffect(
    () => {
      setLocalStorage("cart", cart);
      
      // clean up function
      return () => {
        // const _totalCart = cart.reduce((sum: any, obj: _product_) => sum + obj.count, 0 );
        // console.log(_totalCart);
      }
    },
    [cart]
  );

    
  function handleAddRemoveCart(productItem: _product_, action: 'add' | 'remove' = 'add') {
    const selectedProductItemIndex = cart.findIndex((ele: _product_) => ele.id == productItem.id);

    if (action == 'add') {
      if (selectedProductItemIndex === -1 ) {
        const newCartItem: _product_ = {
          ...productItem,
          count: 1
        };
        setCart([ ...cart, newCartItem ]);
      }
    }

    if (action == 'remove') {
      cart.splice(selectedProductItemIndex, 1);
      setCart([ ...cart ]);
    }
  };

  function handleCartItemCount(product: _product_, action: 'plus' | 'minus') {
    const productItem = cart.find((ele: _product_) => ele.id == product.id);
    
    if (productItem) {
      const count: number = productItem.count ? productItem.count : 0;

      if (action == 'plus') {
        productItem.count = count + 1;
      }

      if (action == 'minus') {
        productItem.count = count - 1;

        if (!productItem.count) {
          handleAddRemoveCart(productItem, 'remove');
          return;
        }
      }

      const selectedProductItemIndex = cart.findIndex((ele: _product_) => ele.id == productItem.id);
      if (selectedProductItemIndex !== -1 ) {
        cart[selectedProductItemIndex] = productItem;
        setCart([ ...cart ]);
      }

      return cart[selectedProductItemIndex];
    }
  }

  
  return (
    <div style={{paddingTop: "25px", paddingBottom: "15px"}}>
      <Head>
        <title>Teens Tech Hub - Cart</title>
        <meta name="description" content="Teens Tech Hub - Shop" />
        <meta name="keywords" content="Teens Tech Hub - Shop" />
        <meta name="robots" content="index, follow" />
        <meta name="title" content="Cart" />
      </Head>

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={7}>
            <Card sx={{ paddingBottom: '0' }}>
              <CardContent sx={{ borderBottom: "1px solid #eee", paddingY: "10px" }}>
                <Typography gutterBottom variant="h5" component="h5" sx={{margin: '0'}}>
                  Cart ({ cart.reduce((sum: any, obj: _product_) => sum + obj.count, 0 ) })
                </Typography>
              </CardContent>

              <CardContent sx={{ paddingBottom: '0', marginBottom: '0' }}>
                {cart.map((cartItem: _product_, index: number) => {
                  return (
                    <Box key={index} 
                      sx={{ 
                        paddingBottom: index == 0 ? "15px" : '', 
                        paddingTop: index ? '15px' : '',
                        borderTop: index ? "1px solid #eee" : ''
                      }}
                    >
                      <Stack direction="column" spacing="auto" alignItems="center">
                        <Stack direction='row' spacing='auto' marginY="15px" sx={{ width: '100%' }}>
                          <Link 
                            href={`/shop/${ sanitizedString(cartItem.title) }`}
                          >
                            <Box>
                              <img src={ cartItem.image } 
                                alt={ sanitizedString(cartItem.title) } 
                                style={{ 
                                  maxWidth: "100px", float: "left", clear: "both", 
                                  marginRight: '10px' 
                                }} 
                              />

                              <Typography gutterBottom variant="body2" component="div" paddingX="10px">
                                { cartItem.title }
                              </Typography>
                            </Box>
                          </Link>

                          <Box>
                            <Typography gutterBottom variant="h6" component="h6">
                              { 
                                Intl.NumberFormat('en-NG', {
                                style: 'currency',
                                currency: 'NGN',
                                maximumFractionDigits: 0,

                                }).format(cartItem.price)
                              }
                            </Typography>                      
                          </Box>
                        </Stack>

                        <Stack direction='row' spacing='auto' style={{ width: "100%", margin: '0', marginTop: "10px", padding: '0' }}>
                          <Button startIcon={<Delete />} onClick={() => {
                            handleAddRemoveCart(cartItem, 'remove');
                          }}>
                            REMOVE
                          </Button>

                          <Stack direction='row' spacing='auto' alignItems="center" sx={{ margin: '0', padding: '0' }}>
                            <Button variant="contained" onClick={() => { handleCartItemCount(cartItem, 'minus'); }}> - </Button>

                            <Typography variant="body2" color="primary" sx={{ paddingX: "15px", margin: '0', paddingY: '0' }}> 
                              { cartItem.count }
                            </Typography>

                            <Button variant="contained" onClick={() => { handleCartItemCount(cartItem, 'plus'); }}> + </Button>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={5}>
            <Card>
              <CardContent sx={{ borderBottom: "1px solid #eee", paddingY: "10px" }}>
                <Typography gutterBottom variant="h5" component="h5" sx={{margin: '0'}}>
                  CART SUMMARY
                </Typography>
              </CardContent>

              <CardContent sx={{ borderBottom: "1px solid #eee" }}>
                <Stack direction="row" spacing="auto" alignItems="center">
                  <Typography gutterBottom variant="body2" component="div">
                    Subtotal
                  </Typography>

                  <Typography gutterBottom variant="h6" component="h6">
                    { 
                      Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                        maximumFractionDigits: 0,
                      }).format(cart.reduce((sum: any, obj: any) => sum + (obj.price * obj.count || 1), 0 ))
                    }
                  </Typography>
                </Stack>
              </CardContent>

              <Box paddingX='15px' paddingY='10px'>
                <Button variant="contained" fullWidth 
                  onClick={() => { handleOpenCheckboxModal(); }}
                >
                  CHECKOUT
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
        
      </Container>


      <Modal
        open={openCheckboxModal}
        onClose={handleCloseCheckboxModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ 
          backgroundColor: '#eee',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
       }}
      >
        <CheckOutView />
      </Modal>
    </div>
  );
};

export default Cart;
