import { parseISO, format } from 'date-fns';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getPosts } from '@/api/content';
import Image from 'next/image'
import Link from 'next/link'
import { kebabCase } from '@/utility/kebab';

export default async function Posts() {
    const posts = await getPosts()
    const temp = posts.concat(posts).concat(posts).concat(posts)

    return (
        <>
            <div>
                <h1>Blog Posts</h1>
                {temp.map((post, idx) => {
                    const postDate = parseISO(post.fields.postDate)
                    return (
                        <div key={idx}>
                            <div>
                                <h2><Link href={`/post/${kebabCase(post.fields.postTitle)}`} >{post.fields.postTitle}</Link></h2>
                                <h3>{format(postDate, 'LLLL d, yyyy')}</h3>
                            </div>
                            <div>{documentToReactComponents(post.fields.postContent, {
                                preserveWhitespace: true,
                            })}</div>
                        </div>
                    )
                })}
            </div>
        </>

    )
}
