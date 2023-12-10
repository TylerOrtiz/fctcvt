import { notFound } from 'next/navigation'
import { getShows } from '@/api/content';
import { getProducts, getInventory } from '@/api/catalog';
import { kebabCase } from '@/utility/kebab';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Box } from '@mui/material';

import Link from 'next/link'

export default async function Shows() {
    const shows = await getShows()

    return <>
        <h1>Shows past and present!</h1>

        {shows.map((show) => {
            return (
                <Box key={show.title}>
                    <Link href={`/show/${kebabCase(show.fields.title)}`}><h1>{show.fields.title}</h1></Link>
                </Box>
            )
        })}
    </>
}