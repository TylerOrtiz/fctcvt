'use client'

import { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { ListItemButton } from '@mui/material';
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import { updateCart, getCart } from '@/cart/cart';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function ActiveShowDates({ showId }) {
    const [showTimes, setShowTimes] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [addToCartMessage, setAddToCartMessage] = useState(false)
    const queryClient = useQueryClient()
    const router = useRouter();

    const maxQuantity = Math.min(10, showTimes[selectedIndex]?.quantity || 0)
    const selectedAvailableToPurchase = (showTimes[selectedIndex]?.quantity || 0) >= 1

    const goToCart = () => {
        router.push(`/cart`);
    }

    const addTicket = async () => {
        const cart = getCart()
        const exists = cart.items.findIndex((item) => item.show_id === showId && item.show_time_id === showTimes[selectedIndex].id)
        if (exists >= 0) {
            cart.items.splice(exists, 1)
        }
        
        cart.items.push({show_id: showId, show_time_id: showTimes[selectedIndex].id, quantity: quantity})
        
        updateCart(cart)
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        setQuantity(1)
        setSelectedIndex(null)
        setAddToCartMessage(true)
        setTimeout(() => {
            goToCart()
        }, 1000)
    }

    const changeQuantity = (quantity) => {
        setQuantity(quantity)
        setAddToCartMessage(false)
    }

    const changeSelectedShow = (index) => {
        setSelectedIndex(index)
        setQuantity(1)
        setAddToCartMessage(false)
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
            <h2>Tickets:</h2>
            <p>No ticket or show times are available. Please try again later.</p>
        </>
    }

    return <>
        <h2>Tickets:</h2>
        <List>
            {showTimes.map((showTime, idx) =>
                <ListItemButton
                    key={idx}
                    selected={selectedIndex === idx}
                    disabled={showTime.quantity ? showTime.quantity === 0 : true}
                    onClick={(event) => changeSelectedShow(idx)}>

                    <ListItemText
                        primary={showTime.name}
                        secondary={showTime.quantity ? `${showTime.quantity} remaining` : '0 remaining'}
                    />


                </ListItemButton>
            )}
        </List>
        {selectedAvailableToPurchase ? <>
            <div style={{ display: selectedIndex === null ? 'none' : 'inherit' }}>
                <FormControl fullWidth>
                    <InputLabel id="quantity-label">Quantity</InputLabel>
                    <Select
                        value={quantity}
                        label="Quantity"
                        labelId="quantity-label"
                        disabled={selectedIndex === null}
                        onChange={(event) => changeQuantity(event.target.value)}
                    >
                        {Array.from({ length: maxQuantity }).map((_, item) => {
                            const value = item + 1
                            return <MenuItem key={value} value={value}>{value}</MenuItem>
                        })}
                    </Select>
                    <Button onClick={() => addTicket()} disabled={selectedIndex === null || quantity === 0} size="large" variant="contained" color="secondary" aria-label="Add to Cart">
                        Add to Cart
                    </Button>
                </FormControl>
            </div>

        </> : null}

        {addToCartMessage ? <>
            <Alert severity="success"
                icon={<CheckIcon fontSize="inherit"></CheckIcon>}
            >Added to cart!</Alert>
        </> : null
        }
    </>
}