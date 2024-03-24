import { notFound } from 'next/navigation'
import { getShows } from '@/api/content';
import { getProducts } from '@/api/catalog';
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import Content from '@/component/ContentBlock/Content'
import LinkGenerator from '@/utility/links'
import Media from '@/utility/media'
import ShowDates from '@/component/Shows/ShowDates'
import AddShow from '@/component/AddShowToCart/AddShow';

export async function generateStaticParams() {
    const shows = await getShows()

    return shows.map((show) => ({
        id: show.id,
    }))
}

export default async function Page({ params }) {
    const shows = await getShows()
    const show = shows.find(f => f.id === params.id)

    if (!show) {
        notFound()
    }
    
    const products = await getProducts()
    const productData = products.find(product => product.itemData?.name === show.title)
    const showTicketUrl = show.isCurrent


    const Location = () => (
        <>
            <h2>Location:</h2>
            <address>
                {show.location.name} <br />
                {show.location.streetAddress} <br />
                {show.location.city}, {show.location.state} {show.location.zipCode}
            </address>
        </>
    )

    const ShowDetails = () => (
        <>
            <h2>About the Show:</h2>
            <Content content={show.showDetails} />
        </>
    )

    return <>
        <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href={LinkGenerator.showsLink()}
                >
                    Shows
                </Link>
                <Typography>{show.title}</Typography>
            </Breadcrumbs>

            <h1>{show.title}</h1>

            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {show.featuredImage ? (
                    <Grid xs={4} sm={8} md={12}>
                        <Image alt={show.title} src={Media.featureImage(show.featuredImage?.[0]?.public_id, 800, 350)} width={800} height={350}
                            style={{
                                width: '100%',
                                height: 'auto',
                            }} />
                    </Grid>
                ) : null}

                {showTicketUrl && <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button href={LinkGenerator.showTicketLink(show)} size="large" variant="contained" color="secondary" aria-label="Get Tickets">
                        Get Tickets
                    </Button>
                    <AddShow id={show.id} quantity={1}></AddShow>
                  
                    </Box>}
                <Grid xs={4} sm={8} md={12}>
                    <ShowDetails />
                </Grid>
                <Grid xs={4} sm={4} md={6}>
                    <ShowDates showId={productData?.id} />
                </Grid>
                <Grid xs={4} sm={4} md={6}>
                    <Location />
                </Grid>
            </Grid>
        </Box>

    </>
}