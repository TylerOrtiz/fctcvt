'use client'

import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function ShowDates({ showId }) {
    const [showTimes, setShowTimes] = useState([])
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
            {showTimes.map(showTime =>
                <ListItem key={showTime.id}>
                    <ListItemText
                        primary={showTime.name}
                        secondary={showTime.quantity ? `${showTime.quantity} remaining` : ''}
                    />
                </ListItem>
            )}
        </List>
    </>
}