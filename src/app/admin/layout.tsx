import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — APPISTRY The Hidden Key',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#040810' }}>
      {children}
    </div>
  )
}
