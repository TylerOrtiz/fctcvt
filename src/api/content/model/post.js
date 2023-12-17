import { kebabCase } from '@/utility/kebab'

const post = (parent) => {
    const fields = parent.fields
    return {
        id: kebabCase(fields.postTitle),
        title: fields.postTitle,
        date: fields.postDate ? new Date(fields.postDate) : undefined,
        content: fields.postContent,
    }
}

export default post