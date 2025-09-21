import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Race Metrics - 6-Shooter Class Racing Analytics',
  description: 'Track and optimize your racing performance with comprehensive metrics and recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <nav className="bg-racing-black text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-racing-yellow">
              🏁 Race Metrics
            </h1>
            <div className="text-sm text-gray-300">
              6-Shooter Class Analytics
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}