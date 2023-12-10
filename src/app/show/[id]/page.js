import { notFound } from 'next/navigation'
import { getShows } from '@/api/content';
import { getProducts, getInventory } from '@/api/catalog';
import { kebabCase } from '@/utility/kebab';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
export async function generateStaticParams() {
    const shows = await getShows()

    return shows.map((show) => ({
        id: kebabCase(show.fields.title)
    }))
}

export default async function Page({ params }) {
    const shows = await getShows()
    const show = shows.find(f => f.fields?.title && (kebabCase(f.fields.title) === kebabCase(params?.id)))

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
    console.log('showCatalogIds', productItems)
    const inventory = await getInventory(productItems)
    const inventoryCounts = inventory.counts.map(f => { return { id: f.catalogObjectId, quantity: f.quantity } })
    console.log('inventoryCounts', inventoryCounts)

    const numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

    const showCombined = (show) => {
        const productData = products.objects.find(product => product.itemData?.name === show.fields.title)

        return {
            title: show.fields.title,
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

    return <>
        <Breadcrumbs aria-label="breadcrumb">
            <Link
                underline="hover"
                color="inherit"
                href="/shows"
            >
                Shows
            </Link>
            <Typography>{show.fields.title}</Typography>
        </Breadcrumbs>

        <h1>{show.fields.title}</h1>

        <h2>About the Show:</h2>
        <div>{documentToReactComponents(show.fields.showDetails, {
            preserveWhitespace: true,
        })}</div>

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

        <h2>Location:</h2>
        <address>
            {show.fields.location.fields.name} <br />
            {show.fields.location.fields.streetAddress} <br />
            {show.fields.location.fields.city}, {show.fields.location.fields.state} {show.fields.location.fields.zipCode}
        </address>
    </>
}