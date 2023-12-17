import Content from '@/component/ContentBlock/Content'
import { getPosts } from '@/api/content';
import Image from 'next/image'
import Link from 'next/link'
import { kebabCase } from '@/utility/kebab';
import { Grid } from '@mui/material';
import { longDate } from '@/utility/date';
import Box from '@mui/material/Box'

export default async function Posts() {
    const posts = await getPosts()

    const postComponent = (post) => {
        const hasImage = false
        return <>
            <Grid container columns={{ xs: 12 }} key={post.title}>
                {hasImage ? (
                    <Grid xs={12}>
                        {/* <Image alt={show.title} src={show.featuredImage[0].url} width={show.featuredImage[0].width} height={show.featuredImage[0].height} /> */}
                    </Grid>
                ) : null}
                <Grid xs={4}>
                    <h2><Link href={`/post/${kebabCase(post.title)}`} >{post.title}</Link></h2>
                    <span>{longDate(post.date)}</span>
                </Grid>
                <Grid xs={8}>
                    <Content content={post.content} />
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
