import { cache } from 'react'
import { client } from '@/api/clients/square'


const getProducts = async () => {
    const { result, ...httpResponse } = await client.catalogApi.listCatalog()
    return result
}

const getInventory = async () => {
    const { result, ...httpResponse } = await client.inventoryApi.retrieveInventoryCount('Z4JU43G5AL4ZN56QWSLSPU6U')
    return result
}

const getProductsCached = cache(getProducts)
const getInventoryCached = cache(getInventory)

export { getProducts, getProductsCached, getInventory, getInventoryCached }