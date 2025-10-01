import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Courses from "./Pages/Courses"
import Students from "./Pages/Students"
import { Navigate } from "react-router-dom"


const PrivateRoute = ({ children }) => {
  const loggedIn = localStorage.getItem("loggedIn")
  return loggedIn ? children : <Navigate to="/login" />
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/courses" element={
          <PrivateRoute>
            <Courses />
          </PrivateRoute>
        } />

        <Route path="/" element={<Dashboard />} />

        <Route path="/students" element={
          <PrivateRoute>
            <Students />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App