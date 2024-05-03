'use client'

import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ListItemButton } from '@mui/material';
import AddShow from '../AddShowToCart/AddShow';

export default function ActiveShowDates({ showId }) {
    const [showTimes, setShowTimes] = useState([])
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [quantity, setQuantity] = React.useState(0);

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
        <>
        <Select
          value={quantity}
          label="Quantity"
          onChange={(event) => setQuantity(event.target.value)}
        >
            {[0, 1,2,3].map((item) => {
                return <MenuItem key={item} value={item}>{item}</MenuItem>
            })}
        </Select>
        <AddShow id={showId} quantity={quantity} />
        </>
       
    </>
}