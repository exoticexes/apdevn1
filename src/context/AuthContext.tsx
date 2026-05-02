import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  email: string
  isAdmin: boolean
}

interface RegisteredUser {
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (email: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AUTH_SESSION_KEY = 'epinfy_auth_session'
const REGISTERED_USERS_KEY = 'epinfy_registered_users'

function getRegisteredUsers(): RegisteredUser[] {
  try {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveRegisteredUsers(users: RegisteredUser[]): void {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
}

function getSavedSession(): User | null {
  try {
    const stored = localStorage.getItem(AUTH_SESSION_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function saveSession(user: User | null): void {
  if (user) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(AUTH_SESSION_KEY)
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getSavedSession)

  useEffect(() => {
    saveSession(user)
  }, [user])

  const login = (email: string, password: string): boolean => {
    const isAdmin = email === 'admin' && password === 'admin'
    if (isAdmin) {
      setUser({ email, isAdmin: true })
      return true
    }

    const users = getRegisteredUsers()
    const found = users.find(u => u.email === email && u.password === password)
    if (found) {
      setUser({ email, isAdmin: false })
      return true
    }

    return false
  }

  const register = (email: string, password: string): boolean => {
    const users = getRegisteredUsers()
    if (users.some(u => u.email === email)) {
      return false
    }
    users.push({ email, password })
    saveRegisteredUsers(users)
    setUser({ email, isAdmin: false })
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
