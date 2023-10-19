import { useState } from 'react'
import styles from './../../src/Components/styles.module.css';
import { useForm } from 'react-hook-form';
import { _productsType_ } from '../../src/typeModel';
import { Alert, Box, Button, FormControl, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { save2FirestoreDB } from '../../src/serviceFunctions/firebase';
import colors from '../../src/Components/Theming/Colors';

type _submitResponse_ = {
    display: boolean,
    status: boolean,
    message: string
}

const _styles = {
    boxMain: {
      my: 5,
    },
    title: {
      bgcolor: "primary.main",
      fontSize: { xs: "3.5rem", md: "5.5rem" },
      fontFamily: '"Neucha", cursive',
      textAlign: "center",
      borderBottom: "1px solid",
      p: 3,
      color: colors.primary,
      borderRadius: 5,
    },
    subTitle: {
      fontFamily: '"Red Hat Mono", monospace',
      textDecoration: "underline",
    },
    normalText: {
      fontFamily: '"Red Hat Mono", monospace',
      my: 3,
    },
};

const AddNewProduct = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<any>({ mode: "onTouched" });

    const [submitResponse, setSubmitResponse] = useState<_submitResponse_>({
        display: false,
        status: false,
        message: ''
    });

    async function onSubmit(formData: _productsType_) {
        console.log(formData);

        const response = await save2FirestoreDB("products", formData).then(
            (res: any) =>{
                setSubmitResponse({
                    display: true,
                    status: true,
                    message: "Thanks for contacting, we'll get back to you shortly."
                });
                reset();
            },
            (err: any) => {
                setSubmitResponse({
                    display: true,
                    status: false,
                    message: "Ooops an error occurred."
                });
            }
        );
        
    }
    

  return (
    <main className={`${ styles.contactPage }`}>
        <section className={`${ styles.container }`}>
            <form noValidate onSubmit={ handleSubmit(onSubmit) } style={{ width: '100%'}}>
                <div data-aos="flip-left" style={{ marginBottom: "15px" }}>
                    <Typography variant="h1" color="primary" sx={_styles.title}>
                        Add New Product
                    </Typography>
                </div>

                <Box marginBottom="15px">
                    <TextField variant="outlined" fullWidth 
                        id="productName" label="Product Name/Title"
                        error={ errors.name ? true : false }
                        { 
                            ...register(
                            'name',
                                {
                                    required: true,
                                    // pattern: /[a-zA-Z0-9 ]+$/,
                                    minLength: 4
                                }
                            )
                        }
                    />

                    <div className={ styles.errorContainer }>
                        {
                            errors.name && errors.name.type === "required" && (
                                <div className={`${ styles.formError } form-text`}>Please enter the name/title of the product.</div>
                            )
                        }

                        {
                            errors.name && errors.name.type === "minLength" && (
                                <div className={`${ styles.formError } form-text`}>Product name/title is too short.</div>
                            )
                        }
                    </div>
                </Box>

                <Box marginBottom="15px">
                    <FormControl fullWidth variant='outlined'>
                        <InputLabel htmlFor="productPrice">Product Price</InputLabel>
                        <OutlinedInput type='number' id="productPrice"
                            error={ errors.price ? true : false }
                            inputProps={{ inputMode: 'numeric', pattern: /[0-9]*/ }}
                            label="Product Price"
                            startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                            { 
                                ...register(
                                'price',
                                    {
                                        required: true,
                                        pattern: /[0-9]*/,
                                        // minLength: 4
                                    }
                                )
                            }
                        />
                    </FormControl>

                    <div className={ styles.errorContainer }>
                        {
                            errors.price && errors.price.type === "required" && (
                                <div className={`${ styles.formError }`}>Please enter the price of the product.</div>
                            )
                        }
                        {
                            errors.price && errors.price.type === "pattern" && (
                                <div className={`${ styles.formError }`}>Please enter a valid price.</div>
                            )
                        }
                    </div>
                </Box>
                
                <Box marginBottom="15px">
                    <TextField variant="outlined" fullWidth 
                        id="productUnits" label="Units"
                        error={ errors.units ? true : false }
                        type='number'
                        inputProps={{ inputMode: 'numeric', pattern: /[0-9]*/ }}
                        { 
                            ...register(
                            'units',
                                {
                                    required: true,
                                    // pattern: "[a-zA-Z0-9 ]+$",
                                    // minLength: 4
                                }
                            )
                        }
                    />

                    <div className={ styles.errorContainer }>
                        {
                            errors.units && errors.units.type === "required" && (
                                <div className={`${ styles.formError } form-text`}>Please enter available quantity.</div>
                            )
                        }
                    </div>
                </Box>
                
                <Box marginBottom="15px">
                    <TextField variant="outlined" fullWidth 
                        id="outlined-basic" label="Product Images"
                        error={ errors.images ? true : false }
                        { 
                            ...register(
                            'images',
                                {
                                    required: true,
                                    // pattern: /[a-zA-Z0-9 ]+$/,
                                    // pattern: /^[a-zA-Z0-9\s]+$/i,
                                    // minLength: 4
                                }
                            )
                        }
                    />

                    <div className={ styles.errorContainer }>
                        {
                            errors.images && errors.images.type === "required" && (
                                <div className={`${ styles.formError } form-text`}>Please enter the reason for contacting us.</div>
                            )
                        }

                        {
                            errors.images && errors.images.type === "minLength" && (
                                <div className={`${ styles.formError } form-text`}>Please enter a valid subject.</div>
                            )
                        }
                    </div>
                </Box>
                
                <Box marginBottom="15px">
                    <TextField
                        id="productDescription"
                        label="Product Description"
                        variant="outlined"
                        multiline
                        error={ errors.description ? true : false }
                        fullWidth
                        rows={4}
                        { 
                            ...register(
                            'description',
                                {
                                    required: true,
                                    // pattern: "[a-zA-Z0-9 ]+$",
                                    minLength: 4
                                }
                            )
                        }
                    />  

                    <div className={ styles.errorContainer }>
                        {
                            errors.description && errors.description.type === "required" && (
                                <div className={`${ styles.formError } form-text`}>Please enter the description of the product.</div>
                            )
                        }

                        {
                            errors.description && errors.description.type === "minLength" && (
                                <div className={`${ styles.formError } form-text`}>Product description is too short.</div>
                            )
                        }
                    </div>
                </Box>

                <Box marginBottom="15px">
                    {
                        submitResponse.display && submitResponse.status && (
                            <Alert severity="success"> { submitResponse.message } </Alert>
                        )
                    }

                    {
                        submitResponse.display && !submitResponse.status && (
                            <Alert severity="error"> { submitResponse.message } </Alert>
                        )
                    }
                </Box>

                <Box>
                    <Button variant="contained" fullWidth type="submit" disabled={ !isValid || isSubmitting } >
                        Submit
                    </Button>
                </Box>
            </form>
        </section>
    </main>
)
}

export default AddNewProduct