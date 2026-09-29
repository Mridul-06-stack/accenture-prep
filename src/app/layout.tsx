import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Accenture PYQ Prep',
  description: 'Practice previously asked Accenture coding interview questions with strict link priorities for the optimal path.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased bg-primary text-primary transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              {children}
            </div>
            <footer className="py-8 text-center text-sm font-medium text-gray-500/80 dark:text-gray-400/80 border-t border-subtle bg-surface">
              Mridul Ahluwalia
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
