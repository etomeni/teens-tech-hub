import { useEffect, useState } from "react";
import {
  Box, MenuItem, Button, TextField
} from "@mui/material";

function CheckOutView() {
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
            getContry();
        }, 
        [countries]
    );

    return (
        <Box width="100%" sx={{ 
            backgroundColor: '#fff',
            display: 'block',
            width: '100%',
            minWidth: '300px',
            maxWidth: '600px',
            padding: '15px',
            borderRadius: '10px'
        }}>
            <Box marginBottom="15px">
                <TextField id="outlined-basic" label="Full Name(s)" required variant="outlined" fullWidth />
            </Box>

            <Box marginBottom="15px">
                <TextField id="outlined-basic" label="Email Address" required variant="outlined" fullWidth />
            </Box>

            <Box marginBottom="15px">
                <TextField id="outlined-basic" label="Phone Number" required variant="outlined" fullWidth />
            </Box>
            
            <Box marginBottom="15px">
                <TextField id="outlined-basic" label="Physical Address" required variant="outlined" fullWidth />
            </Box>

            <Box marginBottom="15px">
                <TextField id="outlined-basic" label="State/Region/City" required variant="outlined" fullWidth />
            </Box>

            <Box marginBottom="15px">
                <TextField
                    id="country"
                    select
                    // SelectProps={{
                    //   native: true,
                    // }}
                    label="Country"
                    variant="outlined"
                    required
                    fullWidth
                    defaultValue="Nigeria"
                    // helperText="Please select your currency"
                >
                    {countries.map((country: any, index) => (
                        <MenuItem key={index} value={ country.name.common }>
                            <img src={ country.flags.png } alt={ country.flags.alt } style={{ maxWidth: "25px", marginRight: "5px" }} />
                            { country.name.common }
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box>
                <Button variant="contained" fullWidth>Buy Now</Button>
            </Box>
        </Box>
    )
}

export default CheckOutView