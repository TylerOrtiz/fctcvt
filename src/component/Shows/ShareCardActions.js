'use client'

import IconButton from '@mui/material/IconButton';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter'
import CardActions from '@mui/material/CardActions';

export default function ShowCardActions({ url }) {
    const shareUrl = url?.startsWith('/') ?
        encodeURIComponent(`https://${process.env.NEXT_PUBLIC_HOST_NAME}${url}`) :
        url

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}`

    return (
        <CardActions disableSpacing variant="right">
            <IconButton href={twitterUrl} aria-label="Share on Twitter" color="info">
                <Twitter />
            </IconButton>
            <IconButton href={facebookUrl} aria-label="Share on Facebook" color="info">
                <Facebook />
            </IconButton>
        </CardActions>
    )
}
