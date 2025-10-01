
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from './themeSlice'
import { useEffect } from 'react'

function App() {
  const mode = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch()

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    if (mode === 'dark') {
      root.classList.add('dark')
      body.classList.add('bg-gradient-to-br', 'from-gray-900', 'to-gray-800')
      body.classList.remove('bg-gray-100')
    } else {
      root.classList.remove('dark')
      body.classList.remove('bg-gradient-to-br', 'from-gray-900', 'to-gray-800')
      body.classList.add('bg-gray-100')
    }
  }, [mode])

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center'>Redux Themes Toggle</h1>
        <p className='text-gray-600 dark:text-gray-300 mb-4 text-center'>Switch between light and dark mode using the toggle below. Your preference is saved!</p>
        <button
          className={`relative w-20 h-10 flex items-center rounded-full transition-colors duration-500 focus:outline-none shadow-lg border-2 border-gray-300 dark:border-gray-700 ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}
          onClick={() => dispatch(toggleTheme())}
          aria-label='Toggle theme'
        >
          <span
            className={`absolute left-1 top-1 w-8 h-8 rounded-full transition-transform duration-500 ${mode === 'dark' ? 'translate-x-10 bg-yellow-400' : 'translate-x-0 bg-gray-500'}`}
          />
          <span className='sr-only'>Toggle theme</span>
          <span className='absolute left-3 text-xs text-gray-700 dark:text-gray-300'>🌞</span>
          <span className='absolute right-3 text-xs text-gray-700 dark:text-gray-300'>🌙</span>
        </button>
      </div>
    </div>
  )
}

export default App
