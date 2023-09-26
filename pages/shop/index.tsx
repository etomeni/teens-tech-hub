import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

// mui
import {
  Container, Box, Grid, Stack,
  Typography, IconButton, Badge
} from "@mui/material";

// mui icons
import { 
  ShoppingCartOutlined
} from "@mui/icons-material";

import ProductItem from "../../src/Components/shop/item/ProductItem";
import products from "../../src/Components/shop/products";
import { _product_ } from "../../src/typeModel";
import { getLocalStorage, setLocalStorage } from "../../src/serviceFunctions/storeage";
// import styles from "../../src/Components/shop/shopStyles.module.css";


const Shop: NextPage = () => {
  const [cart, setCart] = useState<_product_[]>([]);

  // if (!cart.length) {
  //   getLocalStorage("cart").then((res: any) => {
  //     if (res && res.length) {
  //       setCart(res);
  //     }
  //   });
  // }
  
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

  function displayCount(product: _product_) {
    const productItem = cart.find((ele) => product.id == ele.id);
    // console.log(productItem);

    if (productItem) {
      return productItem;
    } else {
      const emptyProduct: _product_ = {
        title: "",
        price: 0,
        units: 0,
        description: "",
        image: "",
        id: "",
        count: 0
      };
      return emptyProduct;
    }
  }

  return (
    <div style={{ backgroundColor: '#eeeeee'}}>
      <Head>
        <title>Teens Tech Hub - Shop</title>
        <meta name="description" content="Teens Tech Hub - Shop" />
        <meta name="keywords" content="Teens Tech Hub - Shop" />
        <meta name="robots" content="index, follow" />
      </Head>

      <Container>
        <Box>
          <Stack direction='row' spacing='auto' sx={{ my: 5 }}>
            <Typography variant="h3" color="primary">
              Teen Tech Hub Shop
            </Typography>

              <Link href="/shop/cart">
                <IconButton aria-label="cart" color="primary">
                  {/* <Badge badgeContent={cart.length} color="primary"> */}

                    <Badge badgeContent={cart.reduce((sum: any, obj: _product_) => sum + obj.count, 0 )} color="primary">
                      <ShoppingCartOutlined color="primary" />
                    </Badge>
                    cart
                </IconButton>
              </Link>
          </Stack>

          <Grid container spacing={3}>

            {products.map((product: _product_, index: number) => {
              return (
                <Grid item
                  key={index}
                  xs={12} sm={6} md={4} lg={3}
                  // sx={{ display: "flex", justifyContent: "center" }}
                >
                  <ProductItem product={product}
                    cart={cart}
                    handleAddRemoveCart={handleAddRemoveCart}
                    handleCartItemCount={handleCartItemCount}
                    displayCount={displayCount}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Shop;
