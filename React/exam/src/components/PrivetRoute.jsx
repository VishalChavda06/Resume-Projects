import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivetRoute = ({ children }) => {
  // Add your authentication logic here
  // For now, we'll just return the children
  const isAuthenticated = true; // Replace with actual authentication check
  
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivetRoute