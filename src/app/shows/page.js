import { getShows } from '@/api/content';
import { kebabCase } from '@/utility/kebab';
import { Box } from '@mui/material';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link'
import { format } from 'date-fns';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

const isCurrent = (show) => {
    const today = new Date()

    return new Date(show.endDate) >= today
}

export default async function Shows() {
    const shows = await getShows()
    const showsSorted = shows.sort((left, right) =>  {
        return left?.startDate.getTime() > right?.startDate.getTime() ? -1 : 1
    })
    const currentShows = showsSorted.filter((show) => isCurrent(show))
    const pastShows = showsSorted.filter((show) => !isCurrent(show))
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
                <Card sx={{ mt: 3, mb: 3 }}>
                    <CardHeader title={<>
                        <Link href={`/show/${kebabCase(show.title)}`}><b>{show.title} - {format(show.startDate, 'yyyy')}</b></Link>
                    </>} />
                    <CardMedia
                        component="img"
                        height="250"
                        image={show.featuredImage?.[0]?.url}
                    />
                    <CardContent>
                        <div>
                            {documentToReactComponents(show.showDetails, {
                                preserveWhitespace: true,
                                renderText: (text) => text
                            })}
                        </div>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            )
        })}
    </>
}
