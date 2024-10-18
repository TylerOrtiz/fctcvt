import './globals.css'
import { Providers } from './providers'


export const metadata = {
  title: 'FCTC',
  description: 'Fairfax Community Theatre Company',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
