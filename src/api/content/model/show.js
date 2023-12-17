import location from './location'
import image from './image'
import { kebabCase } from '@/utility/kebab'

const show = (parent) => {
    const fields = parent.fields
    return {
        id: kebabCase(fields.title),
        title: fields.title,
        featuredImage: image(fields.featuredImage),
        location: location(fields.location),
        showDetails: fields.showDetails,
        startDate: fields.startDate ? new Date(fields.startDate) : undefined,
        endDate: fields.endDate ? new Date(fields.endDate) : undefined,
    }
}

export default show