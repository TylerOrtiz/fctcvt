'use client'
import Navigation from '@/component/Navigation'
import ThemeRegistry from '@/component/ThemeRegistry/ThemeRegistry';
import {Container} from '@mui/material';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function Providers(props) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 5 * 1000,
                    },
                },
            }),
    )

    return (
        <ThemeRegistry>
            <QueryClientProvider client={queryClient}>
                    <Navigation></Navigation>
                    <Container component="main" maxWidth="lg" sx={{
                        mt: ['87px', '107px']
                    }} disableGutters={true}>
                        {props.children}
                    </Container>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeRegistry>
    )
}
