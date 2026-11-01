'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Stats {
  totalVisitors: number
  activeVisitors: number
  totalParticipants: number
  verifiedParticipants: number
  totalSubmissions: number
  validSubmissions: number
  failedSubmissions: number
  firstBlood: {
    winnerName: string
    winnerEmail: string
    serverTime: string
    isPublic: boolean
  } | null
}

interface Submission {
  id: string
  keyword: string
  isValid: boolean
  isFirstBlood: boolean
  serverTime: string
  participant: {
    name: string
    email: string
    isVerified: boolean
  }
}

interface AdminSubmission {
  id: string
  keyword: string
  isValid: boolean
  isFirstBlood: boolean
  ipAddress?: string | null
  userAgent?: string | null
  serverTime: string
  reviewedAt?: string | null
  reviewNote?: string | null
  participant: {
    id: string
    name: string
    email: string
    isVerified: boolean
    isDisqualified: boolean
  }
}

interface AuditLog {
  id: string
  action: string
  target?: string
  createdAt: string
  admin?: {
    name: string
    email: string
  }
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([])
  const [recentLogs, setRecentLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'hints' | 'announcements' | 'config' | 'logs'>('overview')

  // Submissions Management state
  const [submissionsList, setSubmissionsList] = useState<AdminSubmission[]>([])
  const [submissionsTotal, setSubmissionsTotal] = useState(0)
  const [submissionsPage, setSubmissionsPage] = useState(1)
  const [submissionsFilter, setSubmissionsFilter] = useState<'all' | 'valid' | 'invalid'>('all')
  const [submissionsSearch, setSubmissionsSearch] = useState('')
  const [submissionsLoading, setSubmissionsLoading] = useState(false)
  const [reviewingId, setReviewingId] = useState<string | null>(null)

  // Hints state
  const [hints, setHints] = useState<Array<{ id: string; title: string; content: string; order: number; isPublished: boolean }>>([])
  const [newHintTitle, setNewHintTitle] = useState('')
  const [newHintContent, setNewHintContent] = useState('')

  // Announcements state
  const [announcements, setAnnouncements] = useState<Array<{ id: string; title: string; content: string; type: string; isPublished: boolean }>>([])
  const [newAnnTitle, setNewAnnTitle] = useState('')
  const [newAnnContent, setNewAnnContent] = useState('')
  const [newAnnType, setNewAnnType] = useState('INFO')

  // Config state
  const [config, setConfig] = useState<Record<string, string>>({})
  const [configSaving, setConfigSaving] = useState(false)
  const [actionMessage, setActionMessage] = useState('')

  const showToast = (msg: string) => {
    setActionMessage(msg)
    setTimeout(() => setActionMessage(''), 3500)
  }

  const fetchOverview = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/overview')
      if (res.status === 401) {
        router.push('/admin')
        return
      }
      const data = await res.json()
      if (data.success) {
        setStats(data.stats)
        setRecentSubmissions(data.recentSubmissions || [])
        setRecentLogs(data.recentLogs || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [router])

  const fetchSubmissions = useCallback(async (page = 1, status = submissionsFilter, search = submissionsSearch) => {
    setSubmissionsLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('limit', '30')
      if (status !== 'all') params.set('status', status)
      if (search) params.set('search', search)

      const res = await fetch(`/api/admin/submissions?${params.toString()}`)
      const data = await res.json()
      if (data.success) {
        setSubmissionsList(data.submissions || [])
        setSubmissionsTotal(data.total || 0)
        setSubmissionsPage(data.page || 1)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmissionsLoading(false)
    }
  }, [submissionsFilter, submissionsSearch])

  const fetchHints = useCallback(async () => {
    const res = await fetch('/api/admin/hints')
    const data = await res.json()
    if (data.success) setHints(data.hints)
  }, [])

  const fetchAnnouncements = useCallback(async () => {
    const res = await fetch('/api/admin/announcements')
    const data = await res.json()
    if (data.success) setAnnouncements(data.announcements)
  }, [])

  const fetchConfig = useCallback(async () => {
    const res = await fetch('/api/admin/config')
    const data = await res.json()
    if (data.success) setConfig(data.config)
  }, [])

  useEffect(() => {
    fetchOverview()
  }, [fetchOverview])

  useEffect(() => {
    if (activeTab === 'submissions') fetchSubmissions(1, submissionsFilter, submissionsSearch)
    if (activeTab === 'hints') fetchHints()
    if (activeTab === 'announcements') fetchAnnouncements()
    if (activeTab === 'config') fetchConfig()
  }, [activeTab, submissionsFilter, fetchSubmissions, submissionsSearch, fetchHints, fetchAnnouncements, fetchConfig])

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  // Handle Review Submission (Approve / Reject)
  const handleReviewSubmission = async (submissionId: string, isValid: boolean) => {
    setReviewingId(submissionId)
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId, isValid }),
      })
      const data = await res.json()
      if (data.success) {
        showToast(isValid ? '✓ Submission verified as VALID!' : '✓ Submission marked as INVALID.')
        fetchSubmissions(submissionsPage, submissionsFilter, submissionsSearch)
        fetchOverview()
      } else {
        showToast(data.error || 'Failed to update submission')
      }
    } catch {
      showToast('Network error while updating submission')
    } finally {
      setReviewingId(null)
    }
  }

  // Create Hint
  const handleCreateHint = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newHintTitle || !newHintContent) return
    const res = await fetch('/api/admin/hints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newHintTitle, content: newHintContent, order: hints.length + 1, isPublished: false }),
    })
    if (res.ok) {
      setNewHintTitle('')
      setNewHintContent('')
      fetchHints()
      showToast('Hint created successfully!')
    }
  }

  // Toggle Hint Publish
  const toggleHintPublish = async (id: string, current: boolean) => {
    const res = await fetch('/api/admin/hints', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isPublished: !current }),
    })
    if (res.ok) {
      fetchHints()
      showToast(!current ? 'Hint published!' : 'Hint unpublished.')
    }
  }

  // Delete Hint
  const deleteHint = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hint?')) return
    const res = await fetch(`/api/admin/hints?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchHints()
      showToast('Hint deleted.')
    }
  }

  // Create Announcement
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAnnTitle || !newAnnContent) return
    const res = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newAnnTitle, content: newAnnContent, type: newAnnType, isPublished: true }),
    })
    if (res.ok) {
      setNewAnnTitle('')
      setNewAnnContent('')
      fetchAnnouncements()
      showToast('Announcement posted!')
    }
  }

  // Toggle Announcement Publish
  const toggleAnnPublish = async (id: string, current: boolean) => {
    const res = await fetch('/api/admin/announcements', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isPublished: !current }),
    })
    if (res.ok) {
      fetchAnnouncements()
      showToast(!current ? 'Announcement published!' : 'Announcement hidden.')
    }
  }

  // Save Config
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    setConfigSaving(true)
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      if (res.ok) {
        showToast('Configuration updated!')
      }
    } finally {
      setConfigSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center p-4">
        <div className="neu-card p-8 rounded-3xl flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#ff5e98] border-t-transparent rounded-full animate-spin" />
          <div className="font-mono text-xs font-bold text-slate-700 uppercase tracking-widest">
            Loading Admin Console...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#eef2f6] text-slate-800 flex flex-col font-sans selection:bg-[#ff5e98] selection:text-white">
      {/* Top Header — Fully Responsive Across All Devices */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden neu-icon-btn p-0.5 flex items-center justify-center">
              <Image
                src="/images/appistry-logo.png"
                alt="Logo"
                width={28}
                height={28}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <span className="font-display font-black text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-[#ff5e98] transition-colors">
              APPISTRY
            </span>
          </Link>
          <span className="text-slate-300 font-bold text-xs sm:text-sm">/</span>
          <span className="font-mono text-[10px] sm:text-xs font-bold text-[#ff5e98] tracking-wider uppercase bg-pink-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-pink-100 whitespace-nowrap">
            <span className="hidden sm:inline">SUPER </span>ADMIN
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {actionMessage && (
            <div className="hidden md:flex font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-fade-in">
              {actionMessage}
            </div>
          )}
          <Link
            href="/"
            target="_blank"
            className="neu-card-sm text-slate-700 font-bold px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs hover:text-[#ff5e98] transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline">View </span>Public<span className="hidden sm:inline"> Site</span> ↗
          </Link>
          <button
            onClick={handleLogout}
            className="neu-card-sm px-2.5 sm:px-3.5 py-1.5 rounded-full font-bold text-[11px] sm:text-xs text-rose-500 hover:text-rose-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Mobile Toast Banner */}
      {actionMessage && (
        <div className="md:hidden bg-emerald-600 text-white font-mono text-xs font-bold text-center py-1.5 px-4 animate-fade-in">
          {actionMessage}
        </div>
      )}

      {/* Navigation Tabs — Horizontal Smooth Scroll on Mobile */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-slate-200/60 px-4 sm:px-8 flex gap-2 overflow-x-auto py-2.5 scrollbar-none touch-pan-x">
        {[
          { key: 'overview', label: '📊 Overview' },
          { key: 'submissions', label: `📥 Submissions ${stats ? `(${stats.totalSubmissions})` : ''}` },
          { key: 'hints', label: '💡 Hints Manager' },
          { key: 'announcements', label: '📢 Announcements' },
          { key: 'config', label: '⚙️ Event Config' },
          { key: 'logs', label: '🛡️ Audit Logs' },
        ].map(tab => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'neu-btn-gradient-pink text-white shadow-md scale-[1.02]'
                  : 'neu-card-sm text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && stats && (
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="neu-card p-5 sm:p-6 rounded-[28px] flex flex-col justify-between">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Live Active Visitors
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#00b4d8] my-2 font-mono">
                  {stats.activeVisitors}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Total sessions: {stats.totalVisitors}
                </div>
              </div>

              <div className="neu-card p-5 sm:p-6 rounded-[28px] flex flex-col justify-between">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Verified Participants
                </div>
                <div className="text-3xl sm:text-4xl font-black text-amber-500 my-2 font-mono">
                  {stats.verifiedParticipants}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Total registered: {stats.totalParticipants}
                </div>
              </div>

              <div
                onClick={() => setActiveTab('submissions')}
                className="neu-card p-5 sm:p-6 rounded-[28px] flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform"
                title="Click to view all submissions"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    Submissions (Valid / Total)
                  </span>
                  <span className="text-[10px] font-bold text-[#ff5e98]">View All →</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 my-2 font-mono">
                  {stats.validSubmissions}
                  <span className="text-xl text-slate-400 font-semibold"> / {stats.totalSubmissions}</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Failed attempts: {stats.failedSubmissions}
                </div>
              </div>

              <div className="neu-card p-5 sm:p-6 rounded-[28px] flex flex-col justify-between">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  First Blood Status
                </div>
                <div className="my-2">
                  {stats.firstBlood ? (
                    <div>
                      <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-white font-black text-[10px] tracking-wider px-2.5 py-0.5 rounded-full inline-block shadow-xs">
                        CLAIMED 🏆
                      </span>
                      <div className="text-base font-black text-slate-900 mt-1 truncate">
                        {stats.firstBlood.winnerName}
                      </div>
                      <div className="font-mono text-xs font-bold text-[#00b4d8]">
                        {new Date(stats.firstBlood.serverTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-black text-slate-400 italic">
                      Unclaimed
                    </div>
                  )}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {stats.firstBlood ? new Date(stats.firstBlood.serverTime).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Awaiting fastest solver'}
                </div>
              </div>
            </div>

            {/* Split Tables: Recent Submissions & Recent Audit Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Recent Submissions */}
              <div className="neu-card p-5 sm:p-7 rounded-[28px]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                    Recent Submissions
                  </h2>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className="text-xs font-bold text-[#ff5e98] hover:underline cursor-pointer"
                  >
                    Manage All ({stats.totalSubmissions}) →
                  </button>
                </div>
                {recentSubmissions.length === 0 ? (
                  <div className="bg-[#f8fafc] rounded-2xl p-6 text-center text-slate-400 text-xs italic border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)]">
                    No submissions recorded yet.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {recentSubmissions.map(sub => (
                      <div
                        key={sub.id}
                        className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-slate-900">{sub.participant.name}</span>
                            <span className="font-mono text-xs font-bold text-[#ff5e98] bg-pink-50 px-2 py-0.5 rounded-lg border border-pink-100">
                              Key: {sub.keyword}
                            </span>
                          </div>
                          <div className="font-mono text-xs text-slate-500 truncate mt-0.5">
                            {sub.participant.email}
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 flex-shrink-0">
                          <span
                            className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                              sub.isFirstBlood
                                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-transparent shadow-xs'
                                : sub.isValid
                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                : 'bg-amber-100 text-amber-700 border-amber-200'
                            }`}
                          >
                            {sub.isFirstBlood ? '🩸 FIRST BLOOD' : sub.isValid ? 'VALID' : 'UNVERIFIED'}
                          </span>
                          <div className="font-mono text-xs font-bold text-[#00b4d8]">
                            {new Date(sub.serverTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </div>
                          <div className="font-mono text-[10px] text-slate-400">
                            {new Date(sub.serverTime).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Audit Logs */}
              <div className="neu-card p-5 sm:p-7 rounded-[28px]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                    System Audit Trail
                  </h2>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    Security Logs
                  </span>
                </div>
                {recentLogs.length === 0 ? (
                  <div className="bg-[#f8fafc] rounded-2xl p-6 text-center text-slate-400 text-xs italic border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)]">
                    No audit logs recorded yet.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {recentLogs.map(log => (
                      <div
                        key={log.id}
                        className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <div className="font-mono text-xs font-bold text-[#00b4d8]">
                            {log.action}
                          </div>
                          <div className="text-xs text-slate-600 font-medium mt-0.5 truncate">
                            By {log.admin ? log.admin.name : 'System'} {log.target ? `• Target: ${log.target}` : ''}
                          </div>
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 flex-shrink-0">
                          {new Date(log.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SUBMISSIONS TAB — FULL MANAGEMENT & VERIFICATION */}
        {activeTab === 'submissions' && (
          <div className="flex flex-col gap-6">
            {/* Header, Filters & Search */}
            <div className="neu-card p-5 sm:p-6 rounded-[28px]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                    Participant Submissions
                    <span className="text-xs font-mono font-bold text-[#ff5e98] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                      {submissionsTotal} Total
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Review secret keys submitted by students and approve valid entries for First Blood & Leaderboard.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 flex-wrap">
                  {(['all', 'valid', 'invalid'] as const).map(filter => (
                    <button
                      key={filter}
                      onClick={() => {
                        setSubmissionsFilter(filter)
                        fetchSubmissions(1, filter, submissionsSearch)
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                        submissionsFilter === filter
                          ? 'neu-btn-gradient-pink text-white shadow-xs'
                          : 'neu-card-sm text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {filter === 'all' ? 'All' : filter === 'valid' ? 'Valid Only' : 'Unverified / Invalid'}
                    </button>
                  ))}
                  <button
                    onClick={() => fetchSubmissions(submissionsPage, submissionsFilter, submissionsSearch)}
                    className="neu-card-sm px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#00b4d8] cursor-pointer"
                    title="Refresh Submissions"
                  >
                    🔄 Refresh
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Search by student name or @iitp.ac.in email..."
                  value={submissionsSearch}
                  onChange={e => {
                    setSubmissionsSearch(e.target.value)
                    fetchSubmissions(1, submissionsFilter, e.target.value)
                  }}
                  className="neu-input w-full rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                />
              </div>
            </div>

            {/* Submissions List */}
            <div className="neu-card p-5 sm:p-7 rounded-[28px]">
              {submissionsLoading ? (
                <div className="py-12 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#ff5e98] border-t-transparent rounded-full animate-spin" />
                  Loading submissions...
                </div>
              ) : submissionsList.length === 0 ? (
                <div className="bg-[#f8fafc] rounded-2xl p-10 text-center text-slate-400 text-sm border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)]">
                  <p className="font-bold text-slate-700">No submissions found.</p>
                  <p className="text-xs text-slate-400 mt-1">Students&apos; submitted keys will appear here instantly when they submit on the challenge page.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {submissionsList.map(sub => (
                    <div
                      key={sub.id}
                      className="bg-[#f8fafc] rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)] flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      {/* Left: Participant info & Key */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <h3 className="text-sm font-extrabold text-slate-900">{sub.participant.name}</h3>
                          <span
                            className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                              sub.isFirstBlood
                                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-transparent shadow-xs'
                                : sub.isValid
                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                : 'bg-amber-100 text-amber-700 border-amber-200'
                            }`}
                          >
                            {sub.isFirstBlood ? '🩸 FIRST BLOOD' : sub.isValid ? 'VALID' : 'UNVERIFIED'}
                          </span>
                        </div>
                        <div className="font-mono text-xs text-slate-500 mt-0.5">
                          {sub.participant.email}
                        </div>

                        {/* Submitted Key Chip & Timestamp */}
                        <div className="mt-3 flex items-center gap-2 sm:gap-3 flex-wrap">
                          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Key:</span>
                            <span className="font-mono text-xs font-black text-[#ff5e98] tracking-wider select-all">
                              {sub.keyword}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                            <span>⏱️ {new Date(sub.serverTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                            <span className="text-slate-300">•</span>
                            <span>{new Date(sub.serverTime).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          </div>
                          {sub.ipAddress && (
                            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                              IP: {sub.ipAddress}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 self-start lg:self-center flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200/60 w-full lg:w-auto justify-end">
                        {!sub.isValid ? (
                          <button
                            onClick={() => handleReviewSubmission(sub.id, true)}
                            disabled={reviewingId === sub.id}
                            className="neu-btn-gradient-pink text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {reviewingId === sub.id ? 'Verifying...' : '✓ Approve & Validate'}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReviewSubmission(sub.id, false)}
                            disabled={reviewingId === sub.id}
                            className="neu-card-sm text-rose-600 text-xs font-bold px-4 py-2.5 rounded-xl hover:text-rose-700 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {reviewingId === sub.id ? 'Updating...' : '✕ Revoke / Invalidate'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* HINTS TAB */}
        {activeTab === 'hints' && (
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="neu-card p-5 sm:p-8 rounded-[28px]">
              <h2 className="text-lg font-black text-slate-900 mb-6 tracking-tight">
                Release New Mystery Hint
              </h2>
              <form onSubmit={handleCreateHint} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Hint Title</label>
                  <input
                    type="text"
                    className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                    value={newHintTitle}
                    onChange={e => setNewHintTitle(e.target.value)}
                    placeholder="e.g. Hint 1: The First Clue in the Repository"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Hint Content</label>
                  <textarea
                    className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                    rows={4}
                    value={newHintContent}
                    onChange={e => setNewHintContent(e.target.value)}
                    placeholder="Examine the build script scripts/verify.js carefully..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="neu-btn-gradient-pink text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer self-start w-full sm:w-auto"
                >
                  Create Hint (Draft)
                </button>
              </form>
            </div>

            <div className="neu-card p-5 sm:p-8 rounded-[28px]">
              <h2 className="text-lg font-black text-slate-900 mb-6 tracking-tight">
                Existing Hints ({hints.length})
              </h2>
              {hints.length === 0 ? (
                <div className="bg-[#f8fafc] rounded-2xl p-6 text-center text-slate-400 text-xs italic border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)]">
                  No hints created yet.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {hints.map(hint => (
                    <div
                      key={hint.id}
                      className="bg-[#f8fafc] rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)] flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#ff5e98] bg-pink-50 px-2 py-0.5 rounded-lg border border-pink-100">
                            #{hint.order}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">{hint.title}</h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              hint.isPublished
                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                : 'bg-slate-200 text-slate-600 border-slate-300'
                            }`}
                          >
                            {hint.isPublished ? '● LIVE ON SITE' : '○ DRAFT'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-2.5 whitespace-pre-wrap leading-relaxed">
                          {hint.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start md:self-center">
                        <button
                          onClick={() => toggleHintPublish(hint.id, hint.isPublished)}
                          className="neu-card-sm px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                        >
                          {hint.isPublished ? 'Unpublish' : 'Publish Live'}
                        </button>
                        <button
                          onClick={() => deleteHint(hint.id)}
                          className="neu-card-sm px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-500 hover:text-rose-600 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {activeTab === 'announcements' && (
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="neu-card p-5 sm:p-8 rounded-[28px]">
              <h2 className="text-lg font-black text-slate-900 mb-6 tracking-tight">
                Post New Announcement
              </h2>
              <form onSubmit={handleCreateAnnouncement} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Announcement Title</label>
                    <input
                      type="text"
                      className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                      value={newAnnTitle}
                      onChange={e => setNewAnnTitle(e.target.value)}
                      placeholder="e.g. Hint 2 has been released!"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Type</label>
                    <select
                      className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans bg-transparent"
                      value={newAnnType}
                      onChange={e => setNewAnnType(e.target.value)}
                    >
                      <option value="INFO">Information (Info)</option>
                      <option value="WARNING">Alert / Warning</option>
                      <option value="SUCCESS">Success</option>
                      <option value="FIRST_BLOOD">First Blood Winner</option>
                      <option value="WINNER">Final Winners</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Content</label>
                  <textarea
                    className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                    rows={4}
                    value={newAnnContent}
                    onChange={e => setNewAnnContent(e.target.value)}
                    placeholder="Details about this announcement..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="neu-btn-gradient-pink text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer self-start w-full sm:w-auto"
                >
                  Post Live Immediately
                </button>
              </form>
            </div>

            <div className="neu-card p-5 sm:p-8 rounded-[28px]">
              <h2 className="text-lg font-black text-slate-900 mb-6 tracking-tight">
                Existing Announcements ({announcements.length})
              </h2>
              {announcements.length === 0 ? (
                <div className="bg-[#f8fafc] rounded-2xl p-6 text-center text-slate-400 text-xs italic border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)]">
                  No announcements posted yet.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {announcements.map(ann => (
                    <div
                      key={ann.id}
                      className="bg-[#f8fafc] rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)] flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] font-bold text-[#00b4d8] bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-100">
                            {ann.type}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">{ann.title}</h3>
                          <span className={`text-[10px] font-bold ${ann.isPublished ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {ann.isPublished ? '● Published' : '○ Hidden'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-2.5 whitespace-pre-wrap leading-relaxed">
                          {ann.content}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleAnnPublish(ann.id, ann.isPublished)}
                        className="neu-card-sm px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer self-start md:self-center"
                      >
                        {ann.isPublished ? 'Hide' : 'Publish'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* EVENT CONFIG TAB */}
        {activeTab === 'config' && (
          <div className="neu-card p-5 sm:p-8 rounded-[28px]">
            <h2 className="text-lg font-black text-slate-900 mb-6 tracking-tight">
              Global Event Configuration
            </h2>
            <form onSubmit={handleSaveConfig} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Event Title</label>
                  <input
                    type="text"
                    className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                    value={config.eventTitle || ''}
                    onChange={e => setConfig({ ...config, eventTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Event Status</label>
                  <select
                    className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans bg-transparent"
                    value={config.eventStatus || 'UPCOMING'}
                    onChange={e => setConfig({ ...config, eventStatus: e.target.value })}
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="LIVE">LIVE</option>
                    <option value="PAUSED">PAUSED</option>
                    <option value="ENDED">ENDED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Event Start Date & Time (ISO 8601)</label>
                  <input
                    type="text"
                    className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                    value={config.eventStartAt || ''}
                    onChange={e => setConfig({ ...config, eventStartAt: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Event End Date & Time (ISO 8601)</label>
                  <input
                    type="text"
                    className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                    value={config.eventEndAt || ''}
                    onChange={e => setConfig({ ...config, eventEndAt: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Official Challenge Repository URL</label>
                  <input
                    type="text"
                    className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                    value={config.repositoryUrl || ''}
                    onChange={e => setConfig({ ...config, repositoryUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Submissions Enabled</label>
                  <select
                    className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans bg-transparent"
                    value={config.submissionsOpen || 'true'}
                    onChange={e => setConfig({ ...config, submissionsOpen: e.target.value })}
                  >
                    <option value="true">Enabled (Accepting Submissions)</option>
                    <option value="false">Disabled (Submissions Closed)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Event Description</label>
                <textarea
                  className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                  rows={3}
                  value={config.eventDescription || ''}
                  onChange={e => setConfig({ ...config, eventDescription: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">Prize Information</label>
                <textarea
                  className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                  rows={3}
                  value={config.prizeInfo || ''}
                  onChange={e => setConfig({ ...config, prizeInfo: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="neu-btn-gradient-pink text-white font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-full shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer self-start disabled:opacity-50 w-full sm:w-auto"
                disabled={configSaving}
              >
                {configSaving ? 'Saving Changes...' : 'Save Configuration'}
              </button>
            </form>
          </div>
        )}

        {/* AUDIT LOGS TAB */}
        {activeTab === 'logs' && (
          <div className="neu-card p-5 sm:p-8 rounded-[28px]">
            <h2 className="text-lg font-black text-slate-900 mb-6 tracking-tight">
              Full Audit Trail
            </h2>
            {recentLogs.length === 0 ? (
              <div className="bg-[#f8fafc] rounded-2xl p-6 text-center text-slate-400 text-xs italic border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)]">
                No audit logs recorded yet.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recentLogs.map(log => (
                  <div
                    key={log.id}
                    className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-100 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-xs font-bold text-[#00b4d8]">
                        [{log.action}]
                      </span>{' '}
                      <span className="text-xs text-slate-600 font-medium">
                        Performed by {log.admin ? `${log.admin.name} (${log.admin.email})` : 'System'}
                      </span>
                      {log.target && (
                        <span className="font-mono text-[11px] text-slate-400 ml-2">
                          → {log.target}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-slate-400 flex-shrink-0">
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}