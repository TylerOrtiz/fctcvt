import { getProduct, getInventory } from '@/api/catalog'

const numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export async function GET(request, { params }) {
  const showId = params.id
  const show = await getProduct(showId)
  const variationIds = show.itemData.variations.map((variation) => {
    return variation.id
  })
  const inventory = await getInventory(variationIds)
  const variationData = Object.fromEntries(show.itemData.variations.map(x => [`${x.id}`, x]))
  const inventoryData = Object.fromEntries(inventory.map(x => [`${x.catalogObjectId}`, x]))

  const showtimes = Object.keys(variationData).map((variationKey) => {
    const data = variationData[variationKey]?.itemVariationData
    return {
      id: variationData[variationKey]?.id,
      name: data.name,
      sku: data.sku,
      price: numberFormat.format(data?.priceMoney?.amount / 100n),
      quantity: inventoryData[variationKey]?.quantity
    }
  })

  return Response.json(showtimes)
}