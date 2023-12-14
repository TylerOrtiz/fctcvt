'use client'

import IconButton from '@mui/material/IconButton';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter'
import CardActions from '@mui/material/CardActions';
import { useEffect, useState } from 'react';

export default function ShowCardActions({ url }) {
    const [shareUrl, setShareUrl] = useState(url)

    useEffect(() => {
        if (url?.startsWith('/')) {
            setShareUrl(encodeURIComponent(`https://${process.env.NEXT_PUBLIC_HOST_NAME}${url}`))
        }
    }, [url])

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}`

    return (
        <CardActions disableSpacing>
            <IconButton href={twitterUrl} aria-label="Share on Twitter">
                <Twitter />
            </IconButton>
            <IconButton href={facebookUrl} aria-label="Share on Facebook">
                <Facebook />
            </IconButton>
        </CardActions>
    )
}