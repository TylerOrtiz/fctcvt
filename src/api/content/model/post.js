import { kebabCase } from '@/utility/kebab'
import image from './image'

const post = (parent) => {
    const fields = parent.fields
    return {
        id: kebabCase(fields.postTitle),
        title: fields.postTitle,
        featuredImage: image(fields.featuredImage),
        date: fields.postDate ? new Date(fields.postDate) : undefined,
        content: fields.postContent,
    }
}

export default post