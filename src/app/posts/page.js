import Content from '@/component/ContentBlock/Content'
import { getPosts } from '@/api/content';
import Image from 'next/image'
import Link from 'next/link'
import { Grid } from '@mui/material';
import { longDate } from '@/utility/date';
import Box from '@mui/material/Box'
import LinkGenerator from '@/utility/links'
import ShareActions from '@/component/Share/ShareActions';

export default async function Posts() {
    const posts = await getPosts()

    const postComponent = (post) => {
        const hasImage = false
        return <>
            <Grid container columns={12} key={post.title}>
                {hasImage ? (
                    <Grid item xs={12}>
                        {/* <Image alt={show.title} src={show.featuredImage[0].url} width={show.featuredImage[0].width} height={show.featuredImage[0].height} /> */}
                    </Grid>
                ) : null}
                <Grid item xs={12} sm={4}>
                    <h2><Link href={LinkGenerator.postLink(post)} >{post.title}</Link></h2>
                    <span>{longDate(post.date)}</span>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Content content={post.content} />
                </Grid>
                <Grid item xs={12}>
                    <ShareActions url={LinkGenerator.postLink(post)} />
                </Grid>
            </Grid>
        </>
    }

    return (
        <>
            <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                <h1>Posts</h1>
                {posts.map((post) => {
                    return postComponent(post)
                })}
            </Box>
        </>
    )
}
