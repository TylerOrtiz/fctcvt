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
    if (process.env.USE_EXTERNAL_CHECKOUT === true) {
        const baseUrl = `https://${process.env.SQUARESPACE_HOST_NAME}`
        const pathUrl = `${show.id}`
        // return `${baseUrl}/${pathUrl}`
        // Temporary smoke and mirrors 
        return 'https://fairfax-community-theatre-company.square.site/product/steelmagnolias/34'
    }
   
    return `/show/${show.id}`
}

const linkGenerators = { postsLink, postLink, showsLink, showLink, showTicketLink }

export default linkGenerators
