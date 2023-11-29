import styles from './page.module.css'
import { parseISO, format } from 'date-fns';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getShows, getPosts } from '@/api/content';
import { getProducts, getInventory } from '@/api/catalog';






export default async function Home() {
  const shows = await getShows()
  const posts = await getPosts()
  const products = await getProducts()
  // TODO: Map show structure such that the name of the show is the primary linkage between content and show products
  const productItems = products.objects.reduce((acc, curr) => {
    if (curr.itemData?.variations) {
      acc.push(...curr.itemData?.variations.map(g => g.id))
    }
    return acc
  }, [])
  console.log('showCatalogIds', productItems)
  const inventory = await getInventory(productItems)
  const inventoryCounts = inventory.counts.map(f => { return { id: f.catalogObjectId, quantity: f.quantity } })
  console.log('inventoryCounts', inventoryCounts)
  const options = {
    preserveWhitespace: true,
  };
  const numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  const showsCombined = shows.map((show) => {
    const productData = products.objects.find(product => product.itemData?.name === show.fields.title)

    return {
      title: show.fields.title,
      dates: productData?.itemData.variations.map(g => {
        const inventoryData = inventoryCounts.find(f => f.id === g.id)
        return {
          name: g.itemVariationData.name,
          price: numberFormat.format(g.itemVariationData.priceMoney.amount / 100n),
          currency: g.itemVariationData.priceMoney.currency,
          remaining: inventoryData.quantity
        }
      })
    }
  })

  return (
    <main className={styles.main}>


      <div className={styles.grid}>
        <h1>Shows</h1>
        {showsCombined.map(show => {
          return (
            <div key={show.title}>
              {show.title}
              <ul>

                {show.dates?.map(showtime => {
                  // const date = parseISO(showtime.fields.showTime)
                  return (<li key={showtime.name}>
                    {showtime.name}  {showtime.price} {showtime.currency} Remaining:  {showtime.remaining}
                    {/* {format(date, 'LLLL d, yyyy')} */}
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
