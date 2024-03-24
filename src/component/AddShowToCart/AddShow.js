"use client"
import Button from '@mui/material/Button'

export default function AddShow({id, quantity}) {

    const addTicket = async (id) => {
        await fetch(`/api/cart`, {method: 'POST', body: JSON.stringify({id}), headers: {'Content-Type': 'application/json'}})
    }

    return (<>
        <Button onClick={() => addTicket(id)} size="large" variant="contained" color="secondary" aria-label="Add to Cart">
            Add to Cart
        </Button>
    </>)
}
