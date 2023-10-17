import Link from "next/link";
// mui
import {
    Box, Stack,
    Card, CardContent, CardActionArea,
    Typography, Button
} from "@mui/material";

import { _productsType_ } from "../../../typeModel";
import { sanitizedString } from "../../../serviceFunctions/resources";

function ProductItem(
    { product, cart, handleAddRemoveCart, handleCartItemCount, displayCount }: 
    { product: _productsType_, cart: _productsType_[], handleAddRemoveCart: any, handleCartItemCount: any, displayCount: any }
) {
    return (
        <Card>
            <Link href={`/shop/${ sanitizedString(product.name) }`}>
                <CardActionArea>
                        <Box sx={{
                            width: '100%',
                            height: 200,
                        }}>
                            <img src={ product.image } alt={ product.name } style={{
                            width: '100%',
                            height: '200px',
                            padding: '10px'
                            }} />
                        </Box>

                        <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                                { product.name }
                            </Typography>

                            <Typography gutterBottom variant="h5" component="div">
                            {/* { product.price } */}
                            { 
                                Intl.NumberFormat('en-NG', {
                                style: 'currency',
                                currency: 'NGN',
                                maximumFractionDigits: 0,

                                }).format(product.price)
                            }
                            </Typography>
                        </CardContent>

                </CardActionArea>
            </Link>

            <Box paddingX='15px' paddingY='10px'>
                <Button variant="contained" fullWidth 
                    sx={{
                        display: cart.some((ele) => product.id == ele.id) ? 'none' : '',
                    }}
                    onClick={() => { handleAddRemoveCart(product, 'add') }}
                >
                    ADD TO CART
                </Button>
                    
                <Stack direction='row' spacing='auto'
                    display={ cart.some((ele) => product.id == ele.id) ? '' : 'none' }
                >
                    <Button variant="contained" onClick={() => { handleCartItemCount(product, 'minus') }}> - </Button>

                    <Typography variant="body2" color="primary"> 
                        { displayCount(product).count }
                    </Typography>

                    <Button variant="contained" onClick={() => { handleCartItemCount(product, 'plus') }}> + </Button>
                </Stack>
            </Box>
        </Card>
    );
}

export default ProductItem