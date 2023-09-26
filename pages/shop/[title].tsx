import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container, Box, Grid, Stack, 
  Card, CardContent, CardMedia, CardActionArea,
  Typography, MenuItem, Button, Modal, TextField
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { OnlinePrediction, Delete 
} from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation, Scrollbar, A11y } from "swiper";


import products from "../../src/Components/shop/products";
import { sanitizedString } from "../../src/serviceFunctions/resources";
import { _product_ } from "../../src/typeModel";
import { getLocalStorage, setLocalStorage } from "../../src/serviceFunctions/storeage";
import CheckOutView from "../../src/Components/shop/checkOutView";

const Shop = () => {
  const [productItem, setProductItem] = useState<_product_>();
  const [displayImage, setDisplayImage] = useState('');
  const [cart, setCart] = useState<_product_[]>([]);
  const router = useRouter();

  const [openCheckboxModal, setOpenCheckboxModal] = useState(false);
  const handleOpenCheckboxModal = () => setOpenCheckboxModal(true);
  const handleCloseCheckboxModal = () => setOpenCheckboxModal(false);
  const [countries, setCountries] = useState<any[]>([]);

  const getContry = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
    const country = await response.json();

    country.sort((a: any, b: any) => {
      const stringA = a.name.common.toUpperCase(); // Convert to uppercase for case-insensitive sorting
      const stringB = b.name.common.toUpperCase();
      
      if (stringA < stringB) {
        return -1;
      } else if (stringA > stringB) {
        return 1;
      } else {
        return 0; // Strings are equal
      }
    });
    // console.log(country);

    setCountries(country);
  }

  useEffect(
    () => {
      if (!cart.length) {
        getLocalStorage("cart").then((res: any) => {
          if (res && res.length) {
            setCart(res);
          }
        });
      }
      
      setLocalStorage("cart", cart);
      
      // clean up function
      return () => {
      }
    },
    [cart]
  );

  useEffect(
    () => {
      getContry();

      const _productItem: _product_ = products.filter((evt) => {
        // return evt.id === router.query.title;
        // return sanitizedString(evt.title) === router.query.title;
        if(sanitizedString(evt.title) === router.query.title) {

          setProductItem(evt);
          setDisplayImage(evt.image);

          return evt;
        };
      })[0];

      // setProductItem(_productItem);
      // setDisplayImage(_productItem.image);
    }, 
    [productItem]
  );

  if (!productItem) return null;

  const images = [
    "/images/shop/sony-tablet.png",
    "/images/shop/ipad-bothside.png",
    "/images/shop/ipad-frontView.png",
    "/images/shop/ipad-pen-stand.png",
    "/images/shop/sony-tablet.png",
    "/images/shop/ipad-bothside.png",
    "/images/shop/ipad-frontView.png",
    "/images/shop/ipad-pen-stand.png",
  ];

    
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
    <>
      <Head>
        <title>Teens Tech Shop - { productItem.title }</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content={ productItem.title } />
        <meta name="keywords" content={`Teens Tech Shop, Teens Shop, Tech Hub, Tech Shop, Shop ${productItem.title}`} />
      </Head>

      <Container sx={{ marginTop: "25px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={7}>
            <Card>
              <CardContent>
                <Box sx={{
                  width: '100%',
                  height: '250px',
                  marginBottom: '15px'
                }}>
                  <img src={ displayImage } alt={ productItem.title } style={{
                    width: '100%',
                    height: '250px',
                    // padding: '15px'
                  }} />
                </Box>

                <Box>
                  <Swiper
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    spaceBetween={30}
                    // pagination={{
                    //   clickable: true,
                    // }}
                    slidesPerView={4}
                    navigation
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    // modules={[Navigation, Autoplay]}
                    // className="mySwiper"
                  >
                    {images.map((slide, index) => {
                      return (
                        <SwiperSlide
                          key={index}
                          // className="slidersS"
                          style={{ height: "100%" }}
                          onClick={() => {
                            setDisplayImage(slide)
                          }}
                        >
                          <img src={ slide } alt="..." style={{ maxWidth: "60px" }} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Box>

                <Typography gutterBottom variant="body2" component="div">
                  { productItem.title }
                </Typography>

                  <Typography gutterBottom variant="h6" component="h6">
                    { 
                      Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                      maximumFractionDigits: 0,

                      }).format(productItem.price)
                    }
                  </Typography>
              </CardContent>

              <Box paddingX='15px' paddingY='10px'>
                <Button variant="contained" fullWidth 
                  sx={{ display: cart.some((ele) => productItem.id == ele.id) ? 'none' : '' }}
                  onClick={() => { handleAddRemoveCart(productItem, 'add'); }}
                >
                  ADD TO CART
                </Button>
                    
                <Stack direction='row' spacing='auto'
                  display={ cart.some((ele) => productItem.id == ele.id) ? '' : 'none' }
                >
                  <Button variant="contained" onClick={() => { handleCartItemCount(productItem, 'minus'); }}> - </Button>

                  <Typography variant="body2" color="primary"> 
                    { cart.find((ele) => productItem.id == ele.id)?.count }
                  </Typography>

                  <Button variant="contained" onClick={() => { handleCartItemCount(productItem, 'plus'); }}> + </Button>
                </Stack>
              </Box>
            </Card>

            <Card sx={{ marginTop: "25px" }}>
              <CardContent sx={{ borderBottom: "1px solid #eee", paddingY: "5px" }}>
                <Typography gutterBottom variant="h5" component="h5" padding="0" margin="0">
                  Product Details
                </Typography>
              </CardContent>

              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  { productItem.description }
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={5}>
            <Card sx={{ marginBottom: "25px" }}>
              <CardContent sx={{ borderBottom: "1px solid #eee", paddingY: "5px" }}>
                <Typography gutterBottom variant="h6" component="h6" margin="0" paddingY="0">
                  CART SUM
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

            <Card>
              <CardContent sx={{ borderBottom: "1px solid #eee", paddingY: "5px" }}>
                <Typography gutterBottom variant="h6" component="h6" margin='0' padding='0'>
                  CART SUMMARY
                </Typography>
              </CardContent>

              <CardContent sx={{ borderBottom: "1px solid #eee" }}>
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
                          <Box>
                            <img src={ cartItem.image } 
                              alt={ sanitizedString(cartItem.title) } 
                              style={{ 
                                maxWidth: "70px", float: "left", clear: "both", 
                                marginRight: '5px' 
                              }} 
                            />

                            <Typography gutterBottom variant="body2" component="div" paddingX="5px">
                              { cartItem.title }
                            </Typography>
                          </Box>

                          {/* <Box>
                            <Typography gutterBottom variant="h6" component="h6">
                              { 
                                Intl.NumberFormat('en-NG', {
                                style: 'currency',
                                currency: 'NGN',
                                maximumFractionDigits: 0,

                                }).format(cartItem.price)
                              }
                            </Typography>                      
                          </Box> */}
                        </Stack>
                      </Stack>
                    </Box>
                  );
                })}
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
                  onClick={() => { handleOpenCheckboxModal(); console.log("check out button");}}
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
    </>
  );
};

export default Shop;
