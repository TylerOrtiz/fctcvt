"use client"

import { useState, useEffect } from 'react'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/cart/cart';

export default function CartTrackerNav() {
    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: () =>
            getCart(),
    })
    return (<>
        <IconButton aria-label="cart">
            <Badge badgeContent={cart?.items?.length ?? 0} color="secondary">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    </>)
}
