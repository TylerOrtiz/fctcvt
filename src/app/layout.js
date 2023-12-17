import './globals.css'
import Navigation from '@/component/Navigation'
import ThemeRegistry from '@/component/ThemeRegistry/ThemeRegistry';
import {Container} from '@mui/material';

export const metadata = {
  title: 'FCTC',
  description: 'Fairfax Community Theatre Company',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navigation></Navigation>
          <Container component="main" maxWidth="lg" sx={{
            mt: ['87px', '107px']
          }} disableGutters={true}>
            {children}
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  )
}
