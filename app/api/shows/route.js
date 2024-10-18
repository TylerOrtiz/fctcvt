import { getProducts } from '@/api/catalog';


export async function GET(request) {
    const shows = await getProducts()
    const returnShows = shows.map(show => {
        return {
            id: show.id,
            name: show.itemData.name,
            dates: show.itemData.variations.map(variation => { 
                return { id: variation.id, name: variation.itemVariationData.name, price: variation?.itemVariationData?.priceMoney?.amount?.toString() }
            }),
        }
    })
    return Response.json(returnShows)
}