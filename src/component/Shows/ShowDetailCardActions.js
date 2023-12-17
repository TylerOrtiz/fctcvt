import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import LinkGenerator from '@/utility/links'

export default function ShowDetailCardOptions({ show, showTickets }) {
    const showTicketUrl = showTickets ?? false

    return (
        <CardActions variant="center">
            <Button href={LinkGenerator.showLink(show)} size="large" variant="contained" color="primary" aria-label="Show Details">
                Show Details
            </Button>
            {showTicketUrl && <Button href={LinkGenerator.showTicketLink(show)} size="large" variant="contained" color="secondary" aria-label="Get Tickets">
                Get Tickets
            </Button>}
        </CardActions>
    )
}
