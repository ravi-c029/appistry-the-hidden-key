'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
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
    if (activeTab === 'hints') fetchHints()
    if (activeTab === 'announcements') fetchAnnouncements()
    if (activeTab === 'config') fetchConfig()
  }, [activeTab, fetchHints, fetchAnnouncements, fetchConfig])

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  const showToast = (msg: string) => {
    setActionMessage(msg)
    setTimeout(() => setActionMessage(''), 3500)
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="font-mono text-cyan" style={{ fontSize: '1rem', letterSpacing: '0.1em' }}>
          LOADING ADMIN CONSOLE...
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border-cyan)',
          background: 'rgba(5, 8, 20, 0.9)',
          backdropFilter: 'blur(12px)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display gradient-text-cyan" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
            APPISTRY
          </Link>
          <span style={{ color: 'var(--border-cyan)' }}>/</span>
          <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--cyan-bright)', letterSpacing: '0.05em' }}>
            SUPER ADMIN CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-4">
          {actionMessage && (
            <div
              className="font-mono"
              style={{
                fontSize: '0.8rem',
                color: 'var(--cyan-bright)',
                background: 'var(--cyan-ghost)',
                padding: '0.35rem 0.75rem',
                borderRadius: '4px',
                border: '1px solid var(--border-cyan)',
              }}
            >
              ✓ {actionMessage}
            </div>
          )}
          <Link href="/" target="_blank" className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
            View Public Site ↗
          </Link>
          <button
            onClick={handleLogout}
            className="btn-secondary"
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', color: '#F87171', borderColor: 'rgba(239,68,68,0.3)' }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div
        style={{
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(8, 14, 30, 0.6)',
          padding: '0 2rem',
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
        }}
      >
        {[
          { key: 'overview', label: '📊 Overview' },
          { key: 'hints', label: '💡 Hints Manager' },
          { key: 'announcements', label: '📢 Announcements' },
          { key: 'config', label: '⚙️ Event Config' },
          { key: 'logs', label: '🛡️ Audit Logs' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            style={{
              padding: '0.85rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.key ? '2px solid var(--cyan-bright)' : '2px solid transparent',
              color: activeTab === tab.key ? 'var(--cyan-bright)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && stats && (
          <div className="flex flex-col gap-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-card p-5">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Live Active Visitors
                </div>
                <div className="font-display gradient-text-cyan" style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem' }}>
                  {stats.activeVisitors}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                  Total sessions: {stats.totalVisitors}
                </div>
              </div>

              <div className="glass-card p-5">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Verified Participants
                </div>
                <div className="font-display" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold)', marginTop: '0.25rem' }}>
                  {stats.verifiedParticipants}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                  Total registered: {stats.totalParticipants}
                </div>
              </div>

              <div className="glass-card p-5">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Submissions (Success / Total)
                </div>
                <div className="font-display text-emerald" style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem' }}>
                  {stats.validSubmissions} <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>/ {stats.totalSubmissions}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                  Failed: {stats.failedSubmissions}
                </div>
              </div>

              <div className="glass-card p-5">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  First Blood Status
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  {stats.firstBlood ? (
                    <div>
                      <div className="badge-gold inline-block mb-1">CLAIMED</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-bright)' }}>
                        {stats.firstBlood.winnerName}
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {new Date(stats.firstBlood.serverTime).toLocaleTimeString()}
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.5rem' }}>
                      Unclaimed
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Split Tables: Recent Submissions & Recent Audit Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Submissions */}
              <div className="glass-card p-6">
                <h2 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Recent Submission Activity
                </h2>
                {recentSubmissions.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No submissions recorded yet.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {recentSubmissions.map(sub => (
                      <div
                        key={sub.id}
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{sub.participant.name}</div>
                          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {sub.participant.email}
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={sub.isValid ? 'badge-cyan' : 'badge'}
                            style={{
                              background: sub.isValid ? 'var(--cyan-ghost)' : 'rgba(239,68,68,0.1)',
                              color: sub.isValid ? 'var(--cyan-bright)' : '#F87171',
                              borderColor: sub.isValid ? 'var(--border-cyan)' : 'rgba(239,68,68,0.3)',
                            }}
                          >
                            {sub.isFirstBlood ? '🩸 FIRST BLOOD' : sub.isValid ? 'VALID' : 'INVALID'}
                          </span>
                          <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                            {new Date(sub.serverTime).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Audit Logs */}
              <div className="glass-card p-6">
                <h2 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
                  System Audit Trail
                </h2>
                {recentLogs.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No audit logs recorded yet.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {recentLogs.map(log => (
                      <div
                        key={log.id}
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <div className="font-mono text-cyan" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                            {log.action}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            By {log.admin ? log.admin.name : 'System'} {log.target ? `• Target: ${log.target}` : ''}
                          </div>
                        </div>
                        <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
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

        {/* HINTS TAB */}
        {activeTab === 'hints' && (
          <div className="flex flex-col gap-8">
            <div className="glass-card p-6">
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Release New Mystery Hint
              </h2>
              <form onSubmit={handleCreateHint} className="flex flex-col gap-4">
                <div>
                  <label className="input-label">Hint Title</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newHintTitle}
                    onChange={e => setNewHintTitle(e.target.value)}
                    placeholder="e.g. Hint 1: The First Clue in the Repository"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">Hint Content</label>
                  <textarea
                    className="input-field"
                    rows={4}
                    value={newHintContent}
                    onChange={e => setNewHintContent(e.target.value)}
                    placeholder="Examine the build script scripts/verify.js carefully..."
                    required
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Create Hint (Draft)
                </button>
              </form>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Existing Hints ({hints.length})
              </h2>
              {hints.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No hints created yet.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {hints.map(hint => (
                    <div
                      key={hint.id}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '1rem',
                      }}
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-cyan" style={{ fontSize: '0.8rem' }}>#{hint.order}</span>
                          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{hint.title}</h3>
                          <span
                            className={hint.isPublished ? 'badge-cyan' : 'badge'}
                            style={{
                              background: hint.isPublished ? 'var(--cyan-ghost)' : 'rgba(255,255,255,0.05)',
                              color: hint.isPublished ? 'var(--cyan-bright)' : 'var(--text-muted)',
                            }}
                          >
                            {hint.isPublished ? 'LIVE ON SITE' : 'DRAFT'}
                          </span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                          {hint.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleHintPublish(hint.id, hint.isPublished)}
                          className={hint.isPublished ? 'btn-secondary' : 'btn-primary'}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                        >
                          {hint.isPublished ? 'Unpublish' : 'Publish Live'}
                        </button>
                        <button
                          onClick={() => deleteHint(hint.id)}
                          className="btn-secondary"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', color: '#F87171' }}
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
          <div className="flex flex-col gap-8">
            <div className="glass-card p-6">
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Post New Announcement
              </h2>
              <form onSubmit={handleCreateAnnouncement} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Announcement Title</label>
                    <input
                      type="text"
                      className="input-field"
                      value={newAnnTitle}
                      onChange={e => setNewAnnTitle(e.target.value)}
                      placeholder="e.g. Hint 2 has been released!"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Type</label>
                    <select
                      className="input-field"
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
                  <label className="input-label">Content</label>
                  <textarea
                    className="input-field"
                    rows={4}
                    value={newAnnContent}
                    onChange={e => setNewAnnContent(e.target.value)}
                    placeholder="Details about this announcement..."
                    required
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Post Live Immediately
                </button>
              </form>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Existing Announcements ({announcements.length})
              </h2>
              {announcements.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No announcements posted yet.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {announcements.map(ann => (
                    <div
                      key={ann.id}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="badge-cyan">{ann.type}</span>
                          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{ann.title}</h3>
                          <span style={{ fontSize: '0.75rem', color: ann.isPublished ? 'var(--cyan-bright)' : 'var(--text-dim)' }}>
                            {ann.isPublished ? '● Published' : '○ Hidden'}
                          </span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                          {ann.content}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleAnnPublish(ann.id, ann.isPublished)}
                        className="btn-secondary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
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
          <div className="glass-card p-8">
            <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Global Event Configuration
            </h2>
            <form onSubmit={handleSaveConfig} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="input-label">Event Title</label>
                  <input
                    type="text"
                    className="input-field"
                    value={config.eventTitle || ''}
                    onChange={e => setConfig({ ...config, eventTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">Event Status</label>
                  <select
                    className="input-field"
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
                  <label className="input-label">Event Start Date & Time (ISO 8601)</label>
                  <input
                    type="text"
                    className="input-field"
                    value={config.eventStartAt || ''}
                    onChange={e => setConfig({ ...config, eventStartAt: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">Event End Date & Time (ISO 8601)</label>
                  <input
                    type="text"
                    className="input-field"
                    value={config.eventEndAt || ''}
                    onChange={e => setConfig({ ...config, eventEndAt: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">Official Challenge Repository URL</label>
                  <input
                    type="text"
                    className="input-field"
                    value={config.repositoryUrl || ''}
                    onChange={e => setConfig({ ...config, repositoryUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">Submissions Enabled</label>
                  <select
                    className="input-field"
                    value={config.submissionsOpen || 'true'}
                    onChange={e => setConfig({ ...config, submissionsOpen: e.target.value })}
                  >
                    <option value="true">Enabled (Accepting Submissions)</option>
                    <option value="false">Disabled (Submissions Closed)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="input-label">Event Description</label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={config.eventDescription || ''}
                  onChange={e => setConfig({ ...config, eventDescription: e.target.value })}
                />
              </div>

              <div>
                <label className="input-label">Prize Information</label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={config.prizeInfo || ''}
                  onChange={e => setConfig({ ...config, prizeInfo: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={configSaving}
                style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}
              >
                {configSaving ? 'Saving Changes...' : 'Save Configuration'}
              </button>
            </form>
          </div>
        )}

        {/* AUDIT LOGS TAB */}
        {activeTab === 'logs' && (
          <div className="glass-card p-6">
            <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Full Audit Trail
            </h2>
            <div className="flex flex-col gap-3">
              {recentLogs.map(log => (
                <div
                  key={log.id}
                  style={{
                    padding: '0.85rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span className="font-mono text-cyan" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                      [{log.action}]
                    </span>{' '}
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Performed by {log.admin ? `${log.admin.name} (${log.admin.email})` : 'System'}
                    </span>
                    {log.target && (
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '0.5rem' }}>
                        → {log.target}
                      </span>
                    )}
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
