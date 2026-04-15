import { Link } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50">
      {/* Campaign Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-500 to-fuchsia-500 text-white text-center py-2 text-sm font-extrabold tracking-wide">
        🎁 Yeni üyelere 360 UC Bedava! 🎁
      </div>

      {/* Main Navbar */}
      <nav className="bg-gray-950/95 backdrop-blur-md border-b border-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                EPINFY
              </span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-6">
              <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors font-bold text-sm">
                Ana Sayfa
              </Link>

              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="relative text-gray-300 hover:text-purple-400 transition-colors">
                    <ShoppingCart size={22} />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-extrabold">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                  <div className="flex items-center gap-3">
                    {user?.isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white"
                      >
                        <Shield size={14} />
                        Admin Panel
                      </Link>
                    )}
                    <span className="text-purple-300 text-sm font-bold">{user?.email}</span>
                    <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors">
                      <LogOut size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white px-4 py-2 rounded-lg transition-all font-extrabold text-sm"
                >
                  <User size={18} />
                                  Giriş Yap
                                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
