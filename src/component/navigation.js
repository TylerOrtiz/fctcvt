import Link from 'next/link'

export default function Navigation({ shows }) {
    return (
        <ul>
            <li style={{marginBottom: 10}} key='home'>
                <Link href="/">Home</Link>
            </li>
            {shows.map((show) => (
                <li style={{marginBottom: 10}} key={show.id}>
                    <Link href={`/show/${show.id}`}>{show.title}</Link>
                </li>
            ))}
        </ul>
    )
}
