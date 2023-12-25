import { getContentPages } from '@/api/content';
import Content from '@/component/ContentBlock/Content'
import Box from '@mui/material/Box'

export default async function About() {
  const pages = await getContentPages()
  const page = pages.find(f => f.id === 'about-page')

  return (
    <>
      <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
        <h1>{page.title}</h1>

        <Content content={page.content}></Content>
      </Box>
    </>
  )
}
