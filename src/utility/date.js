import { format, parseISO } from 'date-fns';

const parseDate = (date) => {
    // If the input is already a Date object, return it
    if (date instanceof Date) return date;

    // If it's a string, parse it as ISO date
    if (typeof date === 'string') return parseISO(date);

    // Otherwise return it as is (fallback)
    return date;
};

const longDate = (date) => format(parseDate(date), 'LLLL d, yyyy');
const shortDate = (date) => format(parseDate(date), 'LLLL d');
const yearOnly = (date) => format(parseDate(date), 'yyyy');

export { parseDate, longDate, shortDate, yearOnly }