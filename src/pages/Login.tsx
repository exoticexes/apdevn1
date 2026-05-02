import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun.')
      return
    }

    const success = login(email, password)
    if (!success) {
      setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.')
      return
    }
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900/80 border border-purple-900/30 rounded-2xl p-8 shadow-2xl shadow-purple-900/10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl mb-4">
              <LogIn className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-black text-white">Giriş Yap</h1>
            <p className="text-gray-500 font-bold text-sm mt-2">Epinfy hesabınıza giriş yapın</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-extrabold text-purple-400 mb-2">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="örnek@email.com"
                  className="w-full bg-gray-800/50 border border-purple-900/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-bold text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-extrabold text-purple-400 mb-2">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800/50 border border-purple-900/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-bold text-sm transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700/50 text-red-400 px-4 py-3 rounded-xl text-sm font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white py-3 rounded-xl font-extrabold text-sm transition-all active:scale-98"
            >
              Giriş Yap
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm font-bold mt-6">
            Hesabınız yok mu?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
