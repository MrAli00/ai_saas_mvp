import './globals.css'

export const metadata = {
  title: 'BlogPulse AI',
  description: 'AI SaaS Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}