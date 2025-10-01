import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import { auth, googleProvider } from '../Firebase/firebase'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // JSON Server Authentication
  const jsonSignup = async (name, email, password) => {
    try {
      console.log('Attempting JSON signup with:', email)
      
      // Check if user already exists
      const existingUser = await authAPI.getUserByEmail(email)
      if (existingUser.data.length > 0) {
        return { success: false, error: 'This email is already registered. Please try logging in instead.' }
      }

      // Create new user
      const userData = {
        name,
        email,
        password,
        authMethod: 'json',
        createdAt: new Date().toISOString()
      }

      const result = await authAPI.register(userData)
      console.log('JSON signup successful:', result.data)
      
      // Return success without auto-login
      return { success: true, user: result.data }
    } catch (error) {
      console.error('JSON signup error:', error)
      return { success: false, error: 'Failed to create account. Please try again.' }
    }
  }

  const jsonLogin = async (email, password) => {
    try {
      console.log('Attempting JSON login with:', email)
      const result = await authAPI.login(email, password)
      
      if (result.data.length === 0) {
        return { success: false, error: 'Invalid email or password. Please try again.' }
      }

      const user = result.data[0]
      console.log('JSON login successful:', user)
      
      // Set user in state and localStorage
      const userData = {
        uid: user.id,
        email: user.email,
        displayName: user.name,
        authMethod: 'json'
      }
      
      setCurrentUser(userData)
      localStorage.setItem('jsonUser', JSON.stringify(userData))
      
      return { success: true, user: userData }
    } catch (error) {
      console.error('JSON login error:', error)
      return { success: false, error: 'Failed to sign in. Please try again.' }
    }
  }

  // Firebase Authentication
  const firebaseSignup = async (email, password) => {
    try {
      console.log('Attempting to sign up with:', email)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      console.log('Sign up successful:', result.user)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('Sign up error:', error)
      let errorMessage = 'Failed to create account'
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please try logging in instead.'
          break
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.'
          break
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters long.'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/Password authentication is not enabled. Please contact support.'
          break
        default:
          errorMessage = error.message || 'Failed to create account'
      }
      
      return { success: false, error: errorMessage }
    }
  }

  // Firebase Sign in with email and password
  const firebaseLogin = async (email, password) => {
    try {
      console.log('Attempting to login with:', email)
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log('Login successful:', result.user)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('Login error:', error)
      let errorMessage = 'Failed to sign in'
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email. Please sign up first.'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.'
          break
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.'
          break
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Please contact support.'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/Password authentication is not enabled. Please contact support.'
          break
        default:
          errorMessage = error.message || 'Failed to sign in'
      }
      
      return { success: false, error: errorMessage }
    }
  }

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      console.log('Attempting Google login')
      const result = await signInWithPopup(auth, googleProvider)
      console.log('Google login successful:', result.user)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('Google login error:', error)
      let errorMessage = 'Failed to sign in with Google'
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in popup was closed. Please try again.'
          break
        case 'auth/popup-blocked':
          errorMessage = 'Popup was blocked by your browser. Please allow popups and try again.'
          break
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in was cancelled. Please try again.'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Google sign-in is not enabled. Please contact support.'
          break
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'An account already exists with this email using a different sign-in method.'
          break
        default:
          errorMessage = error.message || 'Failed to sign in with Google'
      }
      
      return { success: false, error: errorMessage }
    }
  }

  // Unified Authentication Methods
  const signup = async (name, email, password, method = 'json') => {
    if (method === 'firebase') {
      return await firebaseSignup(email, password)
    } else {
      return await jsonSignup(name, email, password)
    }
  }

  const login = async (email, password, method = 'json') => {
    if (method === 'firebase') {
      return await firebaseLogin(email, password)
    } else {
      return await jsonLogin(email, password)
    }
  }

  // Sign out
  const logout = async () => {
    try {
      if (currentUser?.authMethod === 'json') {
        // JSON Server logout - clear local state and localStorage
        setCurrentUser(null)
        localStorage.removeItem('jsonUser')
        return { success: true }
      } else {
        // Firebase logout
        await signOut(auth)
        return { success: true }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Listen for authentication state changes
  useEffect(() => {
    // Check for JSON Server user in localStorage first
    const jsonUser = localStorage.getItem('jsonUser')
    if (jsonUser) {
      try {
        const user = JSON.parse(jsonUser)
        setCurrentUser(user)
        setLoading(false)
        return
      } catch (error) {
        localStorage.removeItem('jsonUser')
      }
    }

    // Listen for Firebase authentication changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
