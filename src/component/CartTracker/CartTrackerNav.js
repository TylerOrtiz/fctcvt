
import { useState, useEffect } from 'react'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function CartTrackerNav() {
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch(`/api/cart`)
            .then((res) => res.json())
            .then((data) => {
                setCart(data)
            })
            .catch(() => {
                setCart([])
            })
    }, [])
    return (<>
        <IconButton aria-label="cart">
            <Badge badgeContent={cart?.length ?? 0} color="secondary">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    </>)
}
