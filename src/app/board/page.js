import { getContentPages } from '@/api/content';
import Content from '@/component/ContentBlock/Content'

export default async function Board() {
   const pages = await getContentPages()
   const page = pages.find(f => f.id === 'board')

   return (
      <>
         <h1>{page.title}</h1>

         <Content content={page.content}></Content>
      </>
   )
}
