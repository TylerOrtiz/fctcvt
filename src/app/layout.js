import './globals.css'
import Navigation from '@/component/navigation'
import { getShows } from '@/api/content';
import { kebabCase } from '@/utility/kebab';
import ThemeRegistry from '@/component/ThemeRegistry/ThemeRegistry';
import Box from '@mui/material/Box';
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
const DRAWER_WIDTH = 240;

export default async function RootLayout({ children }) {
  const shows = await getShows()

  const showsList = shows.map((show) => ({
    id: kebabCase(show.fields.title),
    title: show.fields.title
  }))
  console.log("are there no shows?", showsList)
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navigation shows={showsList}></Navigation>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${DRAWER_WIDTH}px`,
              mt: ['200px'], // Temporary
              // mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  )
}
