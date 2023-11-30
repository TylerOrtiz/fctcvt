import styles from './page.module.css'
import { parseISO, format } from 'date-fns';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getPosts } from '@/api/content';
import Image from 'next/image'

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className={styles.main}>
      <Image src="/logo.webp" alt="fctc logo" width={302} height={302} />

      <div className={styles.grid}>
        <h1>Blog Posts</h1>
        {posts.map((post, idx) => {
          const postDate = parseISO(post.fields.postDate)
          return (
            <div key={idx}>
              <div>
                <h2>{post.fields.postTitle}</h2>
                <h3>{format(postDate, 'LLLL d, yyyy')}</h3>
              </div>
              <div>{documentToReactComponents(post.fields.postContent, {
                preserveWhitespace: true,
              })}</div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
