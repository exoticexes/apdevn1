import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'info' | 'error' | 'success' | 'warning'
  isVisible: boolean
  onClose: () => void
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const bgColor = {
    info: 'bg-purple-600',
    error: 'bg-red-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
  }[type]

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 font-bold text-sm max-w-sm`}>
        <span>{message}</span>
        <button onClick={onClose} className="hover:opacity-80">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
