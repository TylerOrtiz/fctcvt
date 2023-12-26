import { cache } from 'react'
import client from '@/api/clients/square'


const getProducts = async () => {
    const { result, ...httpResponse } = await client.catalogApi.listCatalog()
    return result.objects
}

const getProduct = async (productId) => {
    const { result, ...httpResponse } = await client.catalogApi.retrieveCatalogObject(productId)
    return result.object
}

const getCategories = async () => {
    const { result, ...httpResponse } = await client.catalogApi.listCatalog('CATEGORY')
    return result.objects
}

const getInventory = async (catalogIds) => {
    const { result, ...httpResponse } = await client.inventoryApi.batchRetrieveInventoryCounts({catalogObjectIds: catalogIds})
    return result.counts
}

const getProductsCached = cache(getProducts)
const getInventoryCached = cache(getInventory)
const getCategoriesCached = cache(getCategories)

export { getProduct, getProducts, getProductsCached, getInventory, getInventoryCached, getCategories, getCategoriesCached }