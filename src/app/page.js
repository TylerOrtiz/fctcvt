import Image from 'next/image'
import styles from './page.module.css'
import { client } from '@/api/contentful'
import { parseISO, format } from 'date-fns';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


async function getShows() {
  const data = await client.getEntries({ content_type: 'show' })
  return data.items
}

async function getPosts() {
  const data = await client.getEntries({ content_type: 'blogPost' })
  return data.items
}


export default async function Home() {
  const shows = await getShows()
  const posts = await getPosts()
  const options = {
    preserveWhitespace: true,
  };
  return (
    <main className={styles.main}>


      <div className={styles.grid}>
        <h1>Shows</h1>
        {shows.map(show => {
          return (
            <div key={show.fields.title}>
              {show.fields.title}
              <ul>
                {show.fields.showDatesAndTimes.map(showtime => {
                  const date = parseISO(showtime.fields.showTime)
                  return (<li key={showtime.fields.showId}>
                    {format(date, 'LLLL d, yyyy')}
                  </li>)
                })}
              </ul>

            </div>
          )
        })}
      </div>

      <div className={styles.grid}>
        <h1>Blog Posts</h1>
        {posts.map(post => {
          const postDate = parseISO(post.fields.postDate)
          return (
            <>
              <div key={post.fields.postTitle}>
                <h2>{post.fields.postTitle}</h2>
                <h3>{format(postDate, 'LLLL d, yyyy')}</h3>
              </div>
              <div>{documentToReactComponents(post.fields.postContent, options)}</div>
            </>
          )
        })}
      </div>
    </main>
  )
}
