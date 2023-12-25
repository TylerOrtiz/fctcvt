import { cache } from 'react'
import client from '@/api/clients/contentful'
import show from './model/show'
import post from './model/post'

const getShows = async () => {
    const { items } = await client.getEntries({ content_type: 'show' })
    const shows = items.map(entry => {
        return show(entry)
    })
    const descendingShows = shows.sort((left, right) => {
        return left?.startDate.getTime() > right?.startDate.getTime() ? -1 : 1
    })

    return descendingShows
}

const getPosts = async () => {
    const { items } = await client.getEntries({ content_type: 'blogPost' })
    const posts = items.map(entry => {
        return post(entry)
    })
    const descendingPosts = posts.sort((left, right) => {
        return left?.date.getTime() > right?.date.getTime() ? -1 : 1
    })

    return descendingPosts
}
const getShowsCached = cache(getShows)
const getPostsCached = cache(getPosts)

export { getShows, getShowsCached, getPosts, getPostsCached }