import { cache } from 'react'
import client from '@/api/clients/square'


const getProducts = async () => {
    const { result, ...httpResponse } = await client.catalogApi.listCatalog()
    return result
}

const getInventory = async (catalogIds) => {
    const { result, ...httpResponse } = await client.inventoryApi.batchRetrieveInventoryCounts({catalogObjectIds: catalogIds})
    return result
}

const getProductsCached = cache(getProducts)
const getInventoryCached = cache(getInventory)

export { getProducts, getProductsCached, getInventory, getInventoryCached }