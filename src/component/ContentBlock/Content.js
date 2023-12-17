import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Content({ content, options }) {
    const renderOptions = {
        preserveWhitespace: true,
        ...options,
    }


    return (
        <>
            <div style={{wordBreak: 'break-word'}}>{documentToReactComponents(content, renderOptions)}</div>
        </>
    )
}
