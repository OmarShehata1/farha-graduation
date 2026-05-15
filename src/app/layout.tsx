import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Farha Tarek · Class of 2026',
  description:
    'A cinematic celebration for Farha Tarek — Mass Communication graduate, class of 2026.',
    icons: {
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎬</text></svg>',
    },
    openGraph: {
    title: 'Farha Tarek · Class of 2026',
    description: 'You became a story worth telling.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Poppins:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&family=Manrope:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-soft-black antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
