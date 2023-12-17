import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getPosts } from '@/api/content';
import Image from 'next/image'
import { longDate } from '@/utility/date';

export default async function Home() {
  const posts = await getPosts()

  return (
    <main>
      <div>
        <h1>Blog Posts</h1>
        {posts.map((post, idx) => {
        
          return (
            <div key={idx}>
              <div>
                <h2>{post.title}</h2>
                <h3>{longDate(post.date)}</h3>
              </div>
              <div>{documentToReactComponents(post.content, {
                preserveWhitespace: true,
              })}</div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
