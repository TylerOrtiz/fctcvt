import location from './location'
import image from './image'
import { kebabCase } from '@/utility/kebab'
import { parseDate } from '@/utility/date'


const isShowCurrent = (date) => {
    const today = new Date()

    return new Date(date) >= today
}

const show = (parent) => {
    const fields = parent.fields
    const startDate = fields.startDate ? parseDate(fields.startDate) : undefined
    const endDate = fields.endDate ? parseDate(fields.endDate) : undefined

    return {
        id: kebabCase(fields.title),
        title: fields.title,
        isCurrent: endDate ? isShowCurrent(endDate) : false,
        featuredImage: image(fields.featuredImage),
        location: location(fields.location),
        showDetails: fields.showDetails,
        startDate: startDate,
        endDate: endDate,
        ludusShowId: fields.ludusShowId,
    }
}

export default show