import { getPosts } from '@/api/content';
import Box from '@mui/material/Box'
import PostCard from '@/component/Posts/PostCard'

export default async function Home() {
  const posts = await getPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <>
      <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
        <h2>Recent Posts</h2>
        {recentPosts.map((post) => (PostCard(post)))}
      </Box>
    </>
  )
}
