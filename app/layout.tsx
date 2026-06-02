import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

type Metadata = { title: string; description: string; icons: any }

export const metadata: Metadata = {
  title: 'qihongweb',
  description: 'qihongweb website',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}