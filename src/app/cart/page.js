import { Button } from '@mui/material';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'


export default async function Page({ params }) {
    const Cart = () => (
        <>
            <h2>Items:</h2>
        </>
    )

    const CartTotal = () => (
        <>
            <h2>Total:</h2>
            <Button>Checkout</Button>
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