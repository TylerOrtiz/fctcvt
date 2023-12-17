import { getShows } from '@/api/content';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ShareActions from '@/component/Share/ShareActions'
import CardActionArea from '@mui/material/CardActionArea';
import ShowDetailCardActions from '@/component/Shows/ShowDetailCardActions';
import { shortDate, yearOnly } from '@/utility/date';
import Content from '@/component/ContentBlock/Content'
import LinkGenerator from '@/utility/links'
import CardActions from '@mui/material/CardActions'

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

    return <>
        <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
            <h1>FCTC Presents: Our shows!</h1>

            <h2>Upcoming Shows</h2>
        </Box>

        {currentShows.map((show) => {
            return (
                <Card sx={{ mt: 3, mb: 3 }} key={show.title}>
                    <CardActionArea href={LinkGenerator.showLink(show)}>
                        <CardHeader variant="currentShow"
                            title={show.title}
                            subheader={`${shortDate(show.startDate)} - ${shortDate(show.endDate)}`}
                            titleTypographyProps={{ component: 'h3' }}
                        >
                        </CardHeader>
                    </CardActionArea>
                    {show.featuredImage?.[0]?.url ? <CardMedia
                        component="img"
                        height="350"
                        image={show.featuredImage?.[0]?.url}
                    /> : null}

                    <CardContent>
                        <Content content={show.showDetails} />
                    </CardContent>
                    <ShowDetailCardActions show={show} showTickets={true} />
                    <CardActions>
                        <ShareActions url={LinkGenerator.showLink(show)} />
                    </CardActions>
                </Card>
            )
        })}

        <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
            <h2>Past Shows</h2>

        </Box>

        {pastShows.map((show) => {
            return (
                <Card sx={{ mt: 3, mb: 3 }} key={show.title}>
                    <CardActionArea href={LinkGenerator.showLink(show)}>
                        <CardHeader variant="pastShow"
                            title={`${show.title} - ${yearOnly(show.startDate)}`}
                            titleTypographyProps={{ component: 'h3' }}
                        >
                        </CardHeader>
                    </CardActionArea>
                    {show.featuredImage?.[0]?.url ? <CardMedia
                        component="img"
                        height="175"
                        image={show.featuredImage?.[0]?.url}
                    /> : null}
                    <CardContent>
                        <Content content={show.showDetails} />
                    </CardContent>
                    <ShowDetailCardActions show={show} />
                    <CardActions>
                        <ShareActions url={LinkGenerator.showLink(show)} />
                    </CardActions>
                </Card>
            )
        })}
    </>
}
