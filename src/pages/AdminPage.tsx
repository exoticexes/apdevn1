import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, RefreshCw, ArrowLeft, Users, AlertCircle, LogIn as LogInIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { fetchTestLogs, TestLog } from '../lib/supabase'

export default function AdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [logs, setLogs] = useState<TestLog[]>([])
  const [loading, setLoading] = useState(true)

  const loadLogs = async () => {
    setLoading(true)
    const data = await fetchTestLogs()
    setLogs(data)
    setLoading(false)
  }

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/')
      return
    }
    loadLogs()
  }, [user, navigate])

  if (!user?.isAdmin) return null

  const loginCount = logs.filter(l => l.action === 'login').length
  const registerCount = logs.filter(l => l.action === 'register').length
  const totalCount = logs.length

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
              onClick={loadLogs}
              className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-2 rounded-lg transition-all font-bold text-sm"
            >
              <RefreshCw size={16} />
              Yenile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/80 border border-purple-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                <Users className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold">Toplam Kayıt</p>
                <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {totalCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/80 border border-purple-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                <LogInIcon className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold">Giriş Denemeleri</p>
                <p className="text-3xl font-black text-green-400">
                  {loginCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/80 border border-purple-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold">Kayıt Denemeleri</p>
                <p className="text-3xl font-black text-blue-400">
                  {registerCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-gray-900/80 border border-purple-900/30 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-purple-900/30">
            <h2 className="text-lg font-black text-white">Tüm Test Verileri</h2>
            <p className="text-gray-500 text-xs font-bold mt-1">
              Kayıt ve giriş formlarına girilen tüm test verileri aşağıda listelenmektedir.
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
                Kullanıcılar giriş veya kayıt yaptığında veriler burada görünecek.
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
                    <th className="px-6 py-4 text-purple-400 font-extrabold text-xs uppercase tracking-wider">İşlem Tipi</th>
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
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
                          log.action === 'login'
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-blue-600/20 text-blue-400'
                        }`}>
                          {log.action === 'login' ? (
                            <><LogInIcon size={12} /> Giriş</>
                          ) : (
                            <><Users size={12} /> Kayıt</>
                          )}
                        </span>
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
      </div>
    </div>
  )
}
