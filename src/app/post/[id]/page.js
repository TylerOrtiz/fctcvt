import { notFound } from 'next/navigation'
import { kebabCase } from '@/utility/kebab';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getPosts } from '@/api/content';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { parseISO, format } from 'date-fns';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    id: kebabCase(post.fields.postTitle)
  }))
}

export default async function Post({ params }) {
  const posts = await getPosts()
  const post = posts.find(f => f.fields?.postTitle && (kebabCase(f.fields.postTitle) === kebabCase(params?.id)))

  if (!post) {
    notFound()
  }
  const postDate = parseISO(post.fields.postDate)

  return <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        color="inherit"
        href="/posts"
      >
        Posts
      </Link>
      <Typography>{post.fields.postTitle}</Typography>
    </Breadcrumbs>

    <div>
      <h2>{post.fields.postTitle}</h2>
      <h3>{format(postDate, 'LLLL d, yyyy')}</h3>
    </div>
    <div>{documentToReactComponents(post.fields.postContent, {
      preserveWhitespace: true,
    })}</div>
  </>
}