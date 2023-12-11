import './globals.css'
import Navigation from '@/component/navigation'
import { getShows } from '@/api/content';
import { kebabCase } from '@/utility/kebab';
import ThemeRegistry from '@/component/ThemeRegistry/ThemeRegistry';
import {Container} from '@mui/material';

export const metadata = {
  title: 'FCTC',
  description: 'Fairfax Community Theatre Company',
}

export default async function RootLayout({ children }) {
  const shows = await getShows()

  const showsList = shows.map((show) => ({
    id: kebabCase(show.fields.title),
    title: show.fields.title
  }))

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navigation shows={showsList}></Navigation>
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
