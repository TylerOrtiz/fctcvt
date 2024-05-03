'use client'

import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { ListItemButton } from '@mui/material';
import Button from '@mui/material/Button'
import { updateCart, getCart } from '@/cart/cart';
import { useQueryClient } from '@tanstack/react-query';

export default function ActiveShowDates({ showId }) {
    const [showTimes, setShowTimes] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const maxQuantity = Math.min(10, showTimes[selectedIndex]?.quantity || 0)
    const queryClient = useQueryClient()

    const addTicket = async (id) => {
        const cart = getCart()
        for (let i = 0; i < quantity; i++) {
            cart.items.push(id)
        }

        updateCart(cart)
        queryClient.invalidateQueries({ queryKey: ['cart'] })
    }

    useEffect(() => {
        fetch(`/api/showtimes/${showId}`)
            .then((res) => res.json())
            .then((data) => {
                setShowTimes(data)
            })
            .catch(() => {
                setShowTimes([])
            })
    }, [showId])

    if (!showTimes) {
        return <>
        </>
    }

    return <>
        <h2>Show Times:</h2>
        <List>
            {showTimes.map((showTime, idx) =>
                <ListItemButton
                    key={idx}
                    selected={selectedIndex === idx}
                    disabled={showTime.quantity ? showTime.quantity === 0 : true}
                    onClick={(event) => setSelectedIndex(idx)}>
                    <ListItem key={showTime.id}>
                        <ListItemText
                            primary={showTime.name}
                            secondary={showTime.quantity ? `${showTime.quantity} remaining` : '0 remaining'}
                        />

                    </ListItem>
                </ListItemButton>
            )}
        </List>
        <div style={{ visibility: selectedIndex === null ? 'hidden' : 'visible' }}>
            <FormControl fullWidth>
                <InputLabel id="quantity-label">Quantity</InputLabel>
                <Select
                    value={quantity}
                    label="Quantity"
                    labelId="quantity-label"
                    disabled={selectedIndex === null}
                    onChange={(event) => setQuantity(event.target.value)}
                >
                    {Array.from({ length: maxQuantity }).map((_, item) => {
                        return <MenuItem key={item} value={item}>{item}</MenuItem>
                    })}
                </Select>
                <Button onClick={() => addTicket(showId)} disabled={selectedIndex === null || quantity === 0} size="large" variant="contained" color="secondary" aria-label="Add to Cart">
                    Add to Cart
                </Button>
            </FormControl>
        </div>

    </>
}