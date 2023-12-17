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
        const hasImage = post.featuredImage?.[0]?.url
        return <>
            <Grid container columns={12} key={post.title}>
                <Grid item xs={12} sm={4}>
                    <h2><Link href={LinkGenerator.postLink(post)} >{post.title}</Link></h2>
                    <span>{longDate(post.date)}</span>
                </Grid>
                <Grid item xs={12} sm={8}>
                    {hasImage ? (
                        <Image alt={post.title} src={post.featuredImage[0].url} width={post.featuredImage[0].width} height={post.featuredImage[0].height} />
                    ) : null}
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
