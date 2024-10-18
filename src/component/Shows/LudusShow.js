'use client'

import { useEffect, useState } from "react";

export default function LudusShow({ showId }) {
    const [iframeUrl, setIframeUrl] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const orderCode = urlParams.get('orderCode');
        const widgetConfirmation = urlParams.get('widgetConfirmation');

        const ludusParams = new URLSearchParams();
        ludusParams.set('widget', '1');
        ludusParams.set('show_id', showId ?? '');
        ludusParams.set('sections', 'all');
        ludusParams.set('category_id', '');
        ludusParams.set('hideNav', 'true');
        ludusParams.set('orderCode', orderCode ?? '');
        ludusParams.set('widgetConfirmation', widgetConfirmation ?? '');

        setIframeUrl(`https://fctc.ludus.com/index.php?${ludusParams.toString()}`);
    }, [showId]);

    return <>
        <h2>Tickets:</h2>
        {iframeUrl && (
            <iframe 
                id='ludusWidget'
                src={iframeUrl}
                sandbox='allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-modals allow-forms allow-top-navigation allow-popups'
                style={{width: '100%', height: '500px', border: 0, overflow: 'hidden'}}
            />
        )}
    </>
}