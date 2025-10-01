import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Book, Users } from 'react-feather'
import { useTheme } from '../../../context/ThemeProvider'

const Sidebar = () => {
  const { darkMode } = useTheme()

  return (
    <div className={`w-64 h-screen shadow-md p-4 border-r  ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-bold mb-6">EduMini</h2>
      <ul className="space-y-4">
        <li><Link to="/" className="flex items-center gap-2 hover:text-blue-600"><Home size={18} /> Dashboard</Link></li>
        <li><Link to="/courses" className="flex items-center gap-2 hover:text-blue-600"><Book size={18} /> Courses</Link></li>
        <li><Link to="/students" className="flex items-center gap-2 hover:text-blue-600"><Users size={18} /> Students</Link></li>
      </ul>
    </div>
  )
}

export default Sidebar
