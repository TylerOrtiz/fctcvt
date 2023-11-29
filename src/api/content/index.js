import { cache } from 'react'
import client from '@/api/clients/contentful'

const getShows = async () => {
    const { items } = await client.getEntries({ content_type: 'show' })
    return items
}

const getPosts = async () => {
    const { items } = await client.getEntries({ content_type: 'blogPost' })
    return items
}

const getShowsCached = cache(getShows)
const getPostsCached = cache(getPosts)

export { getShows, getShowsCached, getPosts, getPostsCached }