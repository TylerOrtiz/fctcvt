import { cache } from 'react'
import client from '@/api/clients/contentful'
import show from './model/show'
import post from './model/post'

const getShows = async () => {
    const { items } = await client.getEntries({ content_type: 'show' })
    const shows = items.map(entry => {
        return show(entry)
    })
    return shows
}

const getPosts = async () => {
    const { items } = await client.getEntries({ content_type: 'blogPost' })
    const posts = items.map(entry => {
        return post(entry)
    })
    return posts
}
const getShowsCached = cache(getShows)
const getPostsCached = cache(getPosts)

export { getShows, getShowsCached, getPosts, getPostsCached }