import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('login')

  const switchToRegister = () => {
    setCurrentView('register')
  }

  const switchToLogin = () => {
    setCurrentView('login')
  }

  return (
    <div className="App">
      {currentView === 'login' ? (
        <Login onSwitchToRegister={switchToRegister} />
      ) : (
        <Register onSwitchToLogin={switchToLogin} />
      )}
    </div>
  )
}

export default App
