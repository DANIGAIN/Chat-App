"use client"
import './globals.css'
import Navbar from './component/Navbar'
import { AuthContextProvider } from '@/context/AuthContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body >
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
