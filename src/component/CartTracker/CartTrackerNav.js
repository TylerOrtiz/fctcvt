"use client"

import { useState, useEffect } from 'react'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/cart/cart';
import { useRouter } from 'next/navigation';

export default function CartTrackerNav() {
    const router = useRouter();
    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: () =>
            getCart(),
    })

    const goToCart = () => {
        router.push(`/cart`);
    }

    return (<>
        <IconButton aria-label="cart" onClick={goToCart}>
            <Badge badgeContent={cart?.items?.length ?? 0} color="secondary">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    </>)
}
