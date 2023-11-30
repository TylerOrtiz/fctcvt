import { notFound } from 'next/navigation'
import { getShows } from '@/api/content';
import { kebabCase } from '@/utility/kebab';

export async function generateStaticParams() {
    const shows = await getShows()

    return shows.map((show) => ({
        id: kebabCase(show.fields.title)
    }))
}

export default async function Page({ params }) {
    const shows = await getShows()
    const show = shows.find(f => f.fields?.title && (kebabCase(f.fields.title) === kebabCase(params?.id)))

    if (!show) {
        notFound()
    }

    return <>
        <h1>{show.fields.title}</h1>

        <address>
            <b>Location:</b><br />
            {show.fields.location.fields.name} <br />
            {show.fields.location.fields.streetAddress} <br />
            {show.fields.location.fields.city}, {show.fields.location.fields.state} {show.fields.location.fields.zipCode}
        </address>
    </>
}