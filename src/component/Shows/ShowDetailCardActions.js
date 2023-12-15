'use client'

import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'

export default function ShowDetailCardOptions({ detailUrl, ticketPath }) {
    const showTicketUrl = ticketPath ?? false
    const getTicketsUrl = `https://${process.env.NEXT_PUBLIC_SQUARESPACE_HOST}/${ticketPath}`
    const showDetailsUrl = detailUrl

    return (
        <CardActions variant="center">
            <Button href={showDetailsUrl} size="large" variant="contained" color="primary" aria-label="Show Details">
                Show Details
            </Button>
            {showTicketUrl && <Button href={getTicketsUrl} size="large" variant="contained" color="secondary" aria-label="Get Tickets">
                Get Tickets
            </Button>}
        </CardActions>
    )
}
