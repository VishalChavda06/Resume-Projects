import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { AuthProvider } from './contexts/AuthContext'
import NavbarComponent from './components/Navbar'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'
import StudentDetails from './components/StudentDetails'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="App">
            <NavbarComponent />
            <Container fluid className="mt-4">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <div className="text-center">
                      <h1 className="display-4 mb-4">Welcome to Student Management System</h1>
                      <p className="lead">Manage your students efficiently with our comprehensive system</p>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/students" element={
                  <ProtectedRoute>
                    <StudentList />
                  </ProtectedRoute>
                } />
                <Route path="/add-student" element={
                  <ProtectedRoute>
                    <StudentForm />
                  </ProtectedRoute>
                } />
                <Route path="/edit-student/:id" element={
                  <ProtectedRoute>
                    <StudentForm />
                  </ProtectedRoute>
                } />
                <Route path="/student/:id" element={
                  <ProtectedRoute>
                    <StudentDetails />
                  </ProtectedRoute>
                } />
                <Route path="/about" element={
                  <ProtectedRoute>
                    <div className="text-center">
                      <h2>About Student Management System</h2>
                      <p>This is a comprehensive system for managing student information.</p>
                    </div>
                  </ProtectedRoute>
                } />
              </Routes>
            </Container>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  )
}

export default App
