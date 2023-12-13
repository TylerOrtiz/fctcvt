import { getShows } from '@/api/content';
import { kebabCase } from '@/utility/kebab';
import { Box } from '@mui/material';
import Link from 'next/link'
import { format } from 'date-fns';

const isCurrent = (show) => {
    const today = new Date()

    return new Date(show.endDate) >= today
}

export default async function Shows() {
    const shows = await getShows()
    const currentShows = shows.filter((show) => isCurrent(show))
    const pastShows = shows.filter((show) => !isCurrent(show))
    const pastShowsByYear = pastShows.reduce((groups, show) => {
        const currentYear = show?.startDate ? new Date(show.startDate).getFullYear() : ''
        const group = (groups[currentYear] || [])
        group.push(show)
        groups[currentYear] = group
        return groups
    }, {})
 
    return <>
        <h1>Current Shows!</h1>
        {currentShows.map((show) => {
            return (
                <Box key={show.title}>
                    <Link href={`/show/${kebabCase(show.title)}`}><h2>{show.title}</h2></Link>
                    <p>From  {format(show.startDate, 'LLLL d, yyyy')} to    {format(show.endDate, 'LLLL d, yyyy')}</p>
                </Box>
            )
        })}

        <h2>Past Shows!</h2>
        {pastShows.map((show) => {
            return (
                <Box key={show.title}>
                    <Link href={`/show/${kebabCase(show.title)}`}><h3>{show.title}</h3></Link>
                    {format(show.startDate, 'yyyy')} 
                </Box>
            )
        })}
    </>
}