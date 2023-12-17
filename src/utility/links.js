const postsLink = () => {
    return `/posts`
}

const postLink = (post) => {
    return `/post/${post.id}`
}

const showsLink = () => {
    return `/shows`
}

const showLink = (show) => {
    return `/show/${show.id}`
}

const showTicketLink = (show) => {
    const baseUrl = `https://${process.env.NEXT_PUBLIC_SQUARESPACE_HOST}`
    const pathUrl = `${show.id}`
    return `${baseUrl}/${pathUrl}`
}

const linkGenerators = { postsLink, postLink, showsLink, showLink, showTicketLink }

export default linkGenerators
