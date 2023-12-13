import { cache } from 'react'
import client from '@/api/clients/contentful'

const location = (parent) => {
    const fields = parent.fields
    return {
        name: fields.name,
        streetAddress: fields.streetAddress,
        city: fields.city,
        state: fields.state,
        zipCode: fields.zipCode,
    }
}

const image = (parent) => {
    return parent?.map((resource) => {
        return {
            url: resource.secure_url,
            public_id: resource.public_id,
            width: resource.width,
            height: resource.height,
        }
    })
}

const getShows = async () => {
    const { items } = await client.getEntries({ content_type: 'show' })
    const shows = items.map(entry => {
        const f = entry.fields
        return {
            title: f.title,
            featuredImage: image(f.featuredImage),
            location: location(f.location),
            showDetails: f.showDetails,
            startDate: f.startDate ? new Date(f.startDate) : undefined,
            endDate: f.endDate ? new Date(f.endDate) : undefined,
        }
    })
    return shows
}

const getPosts = async () => {
    const { items } = await client.getEntries({ content_type: 'blogPost' })
    return items
}

const getShowsCached = cache(getShows)
const getPostsCached = cache(getPosts)

export { getShows, getShowsCached, getPosts, getPostsCached }