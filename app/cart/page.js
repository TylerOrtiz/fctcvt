'use client'
import { Button } from '@mui/material';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import { updateCart, getCart } from '@/cart/cart';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Page({ params }) {
    const queryClient = useQueryClient()
    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: () =>
            getCart(),
    })

    const checkout = async () => {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({ lineItems: cart?.items }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log("checkout response", response)
        const paylaod = await response.json()
        window.location.href = paylaod.url
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