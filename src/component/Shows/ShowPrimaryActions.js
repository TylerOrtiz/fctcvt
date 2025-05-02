import Button from '@mui/material/Button'
import LinkGenerator from '@/utility/links'

export default function ShowPrimaryActions({ show, showTickets }) {
    const showTicketUrl = showTickets ?? false

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button href={LinkGenerator.showLink(show)} size="large" variant="contained" color="primary" aria-label="Show Details" style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                Show Details
            </Button>
            {showTicketUrl && <Button href={LinkGenerator.showTicketLink(show)} size="large" variant="contained" color="secondary" aria-label="Get Tickets" style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                Tickets
            </Button>}
        </div>
    )
}
