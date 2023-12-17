import { format } from 'date-fns';

const longDate = (date) => format(date, 'LLLL d, yyyy')
const shortDate = (date) => format(date, 'LLLL d')
const yearOnly = (date) => format(date, 'yyyy')

export { longDate, shortDate, yearOnly }