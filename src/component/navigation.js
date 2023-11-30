import Link from 'next/link'

export default function Navigation({ shows }) {
    return (
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            {shows.map((show) => (
                <li key={show.id}>
                    <Link href={`/show/${show.id}`}>{show.title}</Link>
                </li>
            ))}
        </ul>
    )
}
