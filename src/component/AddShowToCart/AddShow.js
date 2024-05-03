"use client"
import Button from '@mui/material/Button'
import { updateCart, getCart } from '@/cart/cart';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function AddShow({id, quantity}) {
    const queryClient = useQueryClient()

    const addTicket = async (id) => {
        const cart = getCart()
        cart.items.push(id)
        updateCart(cart)
        queryClient.invalidateQueries({ queryKey: ['cart'] })
    }

    return (<>
        <Button onClick={() => addTicket(id)} size="large" variant="contained" color="secondary" aria-label="Add to Cart">
            Add to Cart
        </Button>
    </>)
}
