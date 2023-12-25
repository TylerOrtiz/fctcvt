import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ShareActions from '@/component/Share/ShareActions'
import CardActionArea from '@mui/material/CardActionArea';
import ShowPrimaryActions from '@/component/Shows/ShowPrimaryActions';
import { shortDate } from '@/utility/date';
import Content from '@/component/ContentBlock/Content'
import LinkGenerator from '@/utility/links'
import CardActions from '@mui/material/CardActions'
import Media from '@/utility/media'

export default function ShowCard(show) {
    return <>
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
    </>
}
