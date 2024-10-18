import { getPosts } from '@/api/content';
import Box from '@mui/material/Box'
import PostCard from '@/component/Posts/PostCard'
export default async function Posts() {
    const posts = await getPosts()

    return (
        <>
            <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                <h1>Posts</h1>
                {posts.map((post) => (PostCard(post)))}
            </Box>
        </>
    )
}
