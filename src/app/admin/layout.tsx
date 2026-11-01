import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — APPISTRY The Hidden Key',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#eef2f6] text-slate-800">
      {children}
    </div>
  )
}
