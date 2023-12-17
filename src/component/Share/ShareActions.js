import IconButton from '@mui/material/IconButton';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter'

const alignmentKeys = {
    'center': 'center',
    'left': 'flex-start',
    'right': 'flex-end'
}

const getAlign = (alignment) => {
    if (!alignment) {
        return 'flex-end'
    }
    return alignmentKeys[alignment] ?? 'flex-end'
}

export default function ShareActions({ url, align }) {
    const shareUrl = url?.startsWith('/') ?
        encodeURIComponent(`https://${process.env.NEXT_PUBLIC_HOST_NAME}${url}`) :
        url

    const alignment = getAlign(align)

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}`

    return (
        <div style={{ display: 'flex', justifyContent: alignment, width: '100%' }}>
            <IconButton href={twitterUrl} aria-label="Share on Twitter" color="info" size="large" style={{ marginLeft: '0.25rem', marginRight: '0.25rem' }}>
                <Twitter />
            </IconButton>
            <IconButton href={facebookUrl} aria-label="Share on Facebook" color="info" size="large" style={{ marginLeft: '0.25rem', marginRight: '0.25rem' }}>
                <Facebook />
            </IconButton>
        </div>
    )
}
