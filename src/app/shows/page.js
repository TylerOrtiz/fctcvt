import { getShows } from '@/api/content';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ShareActions from '@/component/Share/ShareActions'
import CardActionArea from '@mui/material/CardActionArea';
import ShowPrimaryActions from '@/component/Shows/ShowPrimaryActions';
import { shortDate, yearOnly } from '@/utility/date';
import Content from '@/component/ContentBlock/Content'
import LinkGenerator from '@/utility/links'
import CardActions from '@mui/material/CardActions'
import Media from '@/utility/media'

export default async function Shows() {
    const shows = await getShows()
    const currentShows = shows.filter((show) => show.isCurrent)
    const pastShows = shows.filter((show) => !show.isCurrent)

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
                        width={800}
                        height={350}
                        image={Media.bannerImage(show.featuredImage?.[0]?.public_id, 800, 350)}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    /> : null}

                    <CardContent>
                        <Content content={show.showDetails} />
                    </CardContent>
                    <CardActions>
                        <ShowPrimaryActions show={show} showTickets={true} />
                    </CardActions>
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
                        width={800}
                        height={200}
                        image={Media.bannerImage(show.featuredImage?.[0]?.public_id, 800, 200)}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    /> : null}
                    <CardContent>
                        <Content content={show.showDetails} />
                    </CardContent>
                    <CardActions>
                        <ShowPrimaryActions show={show} />
                    </CardActions>
                    <CardActions>
                        <ShareActions url={LinkGenerator.showLink(show)} />
                    </CardActions>
                </Card>
            )
        })}
    </>
}
