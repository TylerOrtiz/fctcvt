import { getShows } from '@/api/content';
import { kebabCase } from '@/utility/kebab';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { format } from 'date-fns';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ShareCardActions from '@/component/Shows/ShareCardActions'
import CardActionArea from '@mui/material/CardActionArea';

const isCurrent = (show) => {
    const today = new Date()

    return new Date(show.endDate) >= today
}

export default async function Shows() {
    const shows = await getShows()
    const showsSorted = shows.sort((left, right) => {
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
        <h1>FCTC Presents: Our shows!</h1>

        <h2>Upcoming Shows</h2>
        {currentShows.map((show) => {
            return (
                <Card sx={{ mt: 3, mb: 3 }} key={show.title}>
                    <CardActionArea href={`/show/${kebabCase(show.title)}`}>
                        <CardHeader 
                            sx={{ color: 'secondary.main' }} 
                            title={<h3 style={{ margin: 0 }}>{show.title} - {format(show.startDate, 'yyyy')}</h3>}
                        >
                        </CardHeader>
                    </CardActionArea>
                    <CardMedia
                        component="img"
                        height="350"
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
                    <ShareCardActions url={`/show/${kebabCase(show.title)}`} />
                </Card>
            )
        })}

        <h2>Past Shows</h2>

        {pastShows.map((show) => {
            return (
                <Card sx={{ mt: 3, mb: 3 }} key={show.title}>
                    <CardActionArea href={`/show/${kebabCase(show.title)}`}>
                        <CardHeader 
                            sx={{ color: 'secondary.main' }} 
                            title={<><h3 style={{ margin: 0 }}>{show.title} - {format(show.startDate, 'yyyy')}</h3></>}
                            >
                        </CardHeader>
                    </CardActionArea>
                    <CardMedia
                        component="img"
                        height="175"
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
                    <ShareCardActions url={`/show/${kebabCase(show.title)}`} />
                </Card>
            )
        })}
    </>
}
