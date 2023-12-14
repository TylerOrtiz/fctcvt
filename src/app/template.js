import { Box } from '@mui/material';

export default function Template({ children }) {
    return (
    <Box sx={{ pt: ['16px'] }}>
        {children}
    </Box>)
}
