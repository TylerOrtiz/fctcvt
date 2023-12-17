import { notFound } from 'next/navigation'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getPosts } from '@/api/content';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import Box from '@mui/material/Box'
import { longDate } from '@/utility/date';

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    id: post.id
  }))
}

export default async function Post({ params }) {
  const posts = await getPosts()
  const post = posts.find(f => f.id === params.id)

  if (!post) {
    notFound()
  }

  return <>
    <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href="/posts"
        >
          Posts
        </Link>
        <Typography>{post.title}</Typography>
      </Breadcrumbs>

      <div>
        <h2>{post.title}</h2>
        <h3>{longDate(post.date)}</h3>
      </div>
      <div>{documentToReactComponents(post.content, {
        preserveWhitespace: true,
      })}</div>
    </Box>
  </>
}