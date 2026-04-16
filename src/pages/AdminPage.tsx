import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Trash2, ArrowLeft, Users, Archive, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { fetchTestLogs, clearTestLogs, TestLog } from '../lib/supabase'

interface ArchivedBatch {
  id: string
  date: string
  logs: TestLog[]
}

const ARCHIVES_KEY = 'epinfy_admin_archives'

function getArchives(): ArchivedBatch[] {
  try {
    const stored = localStorage.getItem(ARCHIVES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveArchives(archives: ArchivedBatch[]): void {
  localStorage.setItem(ARCHIVES_KEY, JSON.stringify(archives))
}

export default function AdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [logs, setLogs] = useState<TestLog[]>([])
  const [loading, setLoading] = useState(true)
  const [archives, setArchives] = useState<ArchivedBatch[]>([])
  const [expandedArchive, setExpandedArchive] = useState<string | null>(null)

  const loadLogs = async () => {
    setLoading(true)
    const data = await fetchTestLogs()
    // Only show registrations
    setLogs(data.filter(l => l.action === 'register'))
    setLoading(false)
  }

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/')
      return
    }
    loadLogs()
    setArchives(getArchives())
  }, [user, navigate])

  if (!user?.isAdmin) return null

  const registerCount = logs.length

  const handleReset = async () => {
    if (logs.length === 0) return

    // Archive current data BEFORE clearing to prevent data loss
    const newArchive: ArchivedBatch = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('tr-TR'),
      logs: [...logs],
    }
    const updatedArchives = [newArchive, ...archives]

    // Clear from Supabase / localStorage
    const success = await clearTestLogs()
    if (!success) return

    // Persist archive only after successful clear to avoid duplicates
    saveArchives(updatedArchives)
    setArchives(updatedArchives)
    setLogs([])
  }

  const toggleArchive = (id: string) => {
    setExpandedArchive(expandedArchive === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900/80 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors font-bold text-sm"
              >
                <ArrowLeft size={18} />
                Ana Sayfa
              </button>
              <div className="h-6 w-px bg-purple-900/50" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                  <Shield className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">Test Log Paneli</h1>
                  <p className="text-gray-500 text-xs font-bold">Admin Kontrol Merkezi</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              disabled={logs.length === 0}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition-all font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 size={16} />
              Sıfırla
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900/80 border border-purple-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <Users className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold">Kayıt Sayısı</p>
                <p className="text-3xl font-black text-blue-400">
                  {registerCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/80 border border-purple-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                <Archive className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold">Arşiv Sayısı</p>
                <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {archives.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Registrations Table */}
        <div className="bg-gray-900/80 border border-purple-900/30 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-purple-900/30">
            <h2 className="text-lg font-black text-white">Kayıt Verileri</h2>
            <p className="text-gray-500 text-xs font-bold mt-1">
              Kayıt formuna girilen tüm test verileri aşağıda listelenmektedir.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-purple-400 font-bold">Veriler yükleniyor...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-16">
              <Shield className="mx-auto text-gray-700 mb-4" size={48} />
              <p className="text-gray-500 font-bold text-lg">Henüz kayıt yok</p>
              <p className="text-gray-600 text-sm font-bold mt-1">
                Kullanıcılar kayıt yaptığında veriler burada görünecek.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-800/50">
                    <th className="px-6 py-4 text-purple-400 font-extrabold text-xs uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-purple-400 font-extrabold text-xs uppercase tracking-wider">E-posta</th>
                    <th className="px-6 py-4 text-purple-400 font-extrabold text-xs uppercase tracking-wider">Şifre</th>
                    <th className="px-6 py-4 text-purple-400 font-extrabold text-xs uppercase tracking-wider">Tarih / Saat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {logs.map((log, index) => (
                    <tr key={log.id || index} className="hover:bg-purple-900/10 transition-colors">
                      <td className="px-6 py-4 text-gray-500 text-sm font-bold">{index + 1}</td>
                      <td className="px-6 py-4">
                        <span className="text-white text-sm font-bold">{log.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-bold">
                          {log.password}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm font-bold">
                        {log.created_at ? new Date(log.created_at).toLocaleString('tr-TR') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Archived Batches */}
        {archives.length > 0 && (
          <div>
            <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <Archive size={20} className="text-purple-400" />
              Arşivler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {archives.map((archive) => (
                <div
                  key={archive.id}
                  className="bg-gray-900/80 border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer"
                  onClick={() => toggleArchive(archive.id)}
                >
                  <div className="px-5 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-white font-extrabold text-sm">{archive.date}</p>
                      <p className="text-gray-500 text-xs font-bold mt-1">
                        {archive.logs.length} kayıt
                      </p>
                    </div>
                    {expandedArchive === archive.id ? (
                      <ChevronUp size={18} className="text-purple-400" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-500" />
                    )}
                  </div>

                  {expandedArchive === archive.id && (
                    <div className="border-t border-purple-900/30">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-gray-800/50">
                              <th className="px-4 py-3 text-purple-400 font-extrabold text-xs uppercase tracking-wider">E-posta</th>
                              <th className="px-4 py-3 text-purple-400 font-extrabold text-xs uppercase tracking-wider">Şifre</th>
                              <th className="px-4 py-3 text-purple-400 font-extrabold text-xs uppercase tracking-wider">Tarih</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800/50">
                            {archive.logs.map((log, idx) => (
                              <tr key={idx} className="hover:bg-purple-900/10 transition-colors">
                                <td className="px-4 py-3 text-white text-xs font-bold">{log.email}</td>
                                <td className="px-4 py-3">
                                  <code className="bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded text-xs font-bold">
                                    {log.password}
                                  </code>
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-xs font-bold">
                                  {log.created_at ? new Date(log.created_at).toLocaleString('tr-TR') : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
