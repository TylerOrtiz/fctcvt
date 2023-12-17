import { notFound } from 'next/navigation'
import { getShows } from '@/api/content';
import { getProducts, getInventory } from '@/api/catalog';
import { kebabCase } from '@/utility/kebab';
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import Content from '@/component/ContentBlock/Content'

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
    // TODO: Map show structure such that the name of the show is the primary linkage between content and show products
    const productItems = products.objects.reduce((acc, curr) => {
        if (curr.itemData?.variations) {
            acc.push(...curr.itemData?.variations.map(g => g.id))
        }
        return acc
    }, [])
    // console.log('showCatalogIds', productItems)
    const inventory = await getInventory(productItems)
    const inventoryCounts = inventory.counts.map(f => { return { id: f.catalogObjectId, quantity: f.quantity } })
    // console.log('inventoryCounts', inventoryCounts)

    const numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

    const showCombined = (show) => {
        const productData = products.objects.find(product => product.itemData?.name === show.title)

        return {
            title: show.title,
            dates: productData?.itemData.variations.map(g => {
                const inventoryData = inventoryCounts.find(f => f.id === g.id)
                return {
                    name: g.itemVariationData.name,
                    price: numberFormat.format(g.itemVariationData.priceMoney.amount / 100n),
                    currency: g.itemVariationData.priceMoney.currency,
                    remaining: inventoryData.quantity
                }
            })
        }
    }

    const showViewModel = showCombined(show)
    const getTicketsUrl = `https://${process.env.NEXT_PUBLIC_SQUARESPACE_HOST}/${kebabCase(show.title)}`
    const showTicketUrl = true // TODO: Consolidate current show logic

    const ShowTimes = () => (
        <>
            <h2>Show Times:</h2>
            <ul>
                {showViewModel.dates?.map(showtime => {
                    return (
                        <li key={showtime.name}>
                            <p>{showtime.name}</p>
                            <p>Ticket Price: {showtime.price} {showtime.currency}</p>
                            <p>Tickets Remaining: {showtime.remaining}</p>
                        </li>
                    )
                })}
            </ul>
        </>
    )

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
                    href="/shows"
                >
                    Shows
                </Link>
                <Typography>{show.title}</Typography>
            </Breadcrumbs>

            <h1>{show.title}</h1>

            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {show.featuredImage ? (
                    <Grid xs={4} sm={8} md={12}>
                        <Image alt={show.title} src={show.featuredImage[0].url} width={show.featuredImage[0].width} height={show.featuredImage[0].height} />
                    </Grid>
                ) : null}

                {showTicketUrl && <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button href={getTicketsUrl} size="large" variant="contained" color="secondary" aria-label="Get Tickets">
                        Get Tickets
                    </Button></Box>}
                <Grid xs={4} sm={8} md={12}>
                    <ShowDetails />
                </Grid>
                <Grid xs={4} sm={4} md={6}>
                    <ShowTimes />
                </Grid>
                <Grid xs={4} sm={4} md={6}>
                    <Location />
                </Grid>
            </Grid>
        </Box>

    </>
}