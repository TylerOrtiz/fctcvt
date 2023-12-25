import LinkGenerator from '@/utility/links'
import Media from '@/utility/media'
import Image from 'next/image'
import Link from 'next/link'
import Content from '@/component/ContentBlock/Content'

import ShareActions from '@/component/Share/ShareActions';
import { Grid } from '@mui/material';
import { longDate } from '@/utility/date';

export default function PostCard(post) {
    const hasImage = post.featuredImage?.[0]?.url
    return <>
        <Grid container columns={12} key={post.title}>
            <Grid item xs={12} sm={4}>
                <h2><Link href={LinkGenerator.postLink(post)} >{post.title}</Link></h2>
                <span>{longDate(post.date)}</span>
            </Grid>
            <Grid item xs={12} sm={8}>
                {hasImage ? (
                    <Image alt={post.title} src={Media.bannerImage(post.featuredImage?.[0]?.public_id, 800, 350)} width={800} height={350}  style={{
                        width: '100%',
                        height: 'auto',
                      }} />
                ) : null}
                <Content content={post.content} />
            </Grid>
            <Grid item xs={12}>
                <ShareActions url={LinkGenerator.postLink(post)} />
            </Grid>
        </Grid>
    </>
}
