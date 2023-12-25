import { getPosts, getShows } from '@/api/content';
import Box from '@mui/material/Box'
import PostCard from '@/component/Posts/PostCard'
import ShowCard from '@/component/Shows/ShowCard'

export default async function Home() {
  const shows = await getShows()
  const currentShows = shows.filter((show) => show.isCurrent)
  const posts = await getPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <>
      <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
        <h2>Current and Upcoming Shows</h2>
        {currentShows.map((show) => (ShowCard(show)))}

        <h2>Recent Posts</h2>
        {recentPosts.map((post) => (PostCard(post)))}
      </Box>
    </>
  )
}
