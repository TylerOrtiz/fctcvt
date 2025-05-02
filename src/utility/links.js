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
    return `https://fctc.ludus.com/${show.ludusShowId}`
}

const linkGenerators = { postsLink, postLink, showsLink, showLink, showTicketLink }

export default linkGenerators
