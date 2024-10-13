'use client'
import { useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import { updateCart, getCart } from '@/cart/cart';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Page({ params }) {
    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: () =>
            getCart(),
    })
    const [errorMessage, setErrorMessage] = useState(null)

    const checkout = async () => {
        try {
            setErrorMessage(null)
            const response = await fetch('/api/checkout', {
                method: 'POST',
                body: JSON.stringify({ lineItems: cart?.items }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const paylaod = await response.json()
            window.location.href = paylaod.url
        } catch (error) {
            setErrorMessage('There was an error processing your request. Please try again later.')
            console.error(error?.message)
        }
      
    }

    const Cart = () => (
        <>
            <h2>Items:</h2>
            {cart?.items?.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </>
    )

    const CartTotal = () => (
        <>
            <h2>Total:</h2>
            <Button onClick={() => checkout()}>Checkout</Button>
        </>
    )

    return <>
        <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
            <h1>Cart</h1>
            {errorMessage ? <>
                <Alert severity="error"
                    icon={<ErrorOutlineIcon fontSize="inherit"></ErrorOutlineIcon>}
                ><span>{errorMessage}</span></Alert>
            </> : null
            }
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={4}>
                <Grid xs={4} sm={8} md={12} >
                    <Cart />
                </Grid>
              
                <Grid xs={4} sm={4} md={6}>
                    <CartTotal />
                </Grid>
            </Grid>
        </Box>

    </>
}