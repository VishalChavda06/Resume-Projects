import React, { useState, useEffect } from 'react'

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    // Enter animation
    const enterTimer = setTimeout(() => setIsMounted(true), 10)

    // Auto close
    let dismissTimer
    if (duration > 0) {
      dismissTimer = setTimeout(() => {
        handleClose()
      }, duration)
    }

    return () => {
      clearTimeout(enterTimer)
      if (dismissTimer) clearTimeout(dismissTimer)
    }
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsHidden(true)
      if (onClose) onClose()
    }, 280)
  }

  if (isHidden) return null

  const baseStyles = 'fixed top-4 right-4 z-50 min-w-[300px] max-w-[90vw] px-5 py-4 rounded-xl shadow-xl transform transition-all duration-300 flex items-start gap-3 backdrop-blur-sm'

  const typeStyles = {
    success: 'bg-green-600/95 text-white',
    error: 'bg-red-600/95 text-white',
    info: 'bg-blue-600/95 text-white',
    warning: 'bg-yellow-500/95 text-white'
  }

  const stateStyles = isExiting
    ? 'translate-x-full opacity-0'
    : isMounted
    ? 'translate-x-0 opacity-100'
    : 'translate-x-full opacity-0'

  const getIcon = () => {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' }
    return icons[type] || icons.info
  }

  return (
    <div className={`${baseStyles} ${typeStyles[type]} ${stateStyles}`}>
      <span className="text-xl leading-none mt-0.5">{getIcon()}</span>
      <div className="flex-1">
        <div className="font-semibold mb-0.5">{message}</div>
        {/* Progress bar */}
        {duration > 0 && (
          <div className="h-1 w-full bg-white/20 rounded overflow-hidden">
            <div
              className="h-full bg-white/90 animate-toast-progress"
              style={{ animationDuration: `${Math.max(duration - 150, 300)}ms` }}
            />
          </div>
        )}
      </div>
      <button
        onClick={handleClose}
        className="ml-3 text-white/80 hover:text-white text-xl leading-none"
        aria-label="Close notification"
      >
        ×
      </button>

      {/* Inline keyframes for progress animation */}
      <style>{`
        @keyframes toast-progress { from { width: 100% } to { width: 0% } }
        .animate-toast-progress { animation-name: toast-progress; animation-timing-function: linear; }
      `}</style>
    </div>
  )
}

export default Toast
