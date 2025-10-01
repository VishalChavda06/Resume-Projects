import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Envelope, Lock, Google } from 'react-bootstrap-icons'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      console.log('Attempting login with:', formData.email)
      // Always use JSON Server for manual login
      const result = await login(formData.email, formData.password, 'json')
      console.log('Login result:', result)
      if (result.success) {
        console.log('Login successful, navigating to students')
        navigate('/students')
      } else {
        console.log('Login failed:', result.error)
        setError(result.error)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setGoogleLoading(true)

    try {
      const result = await loginWithGoogle()
      if (result.success) {
        navigate('/students')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to sign in with Google')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <Container className="min-vh-100 d-flex align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Welcome Back</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                  {error.includes('No account found') && (
                    <div className="mt-2">
                      <Link to="/register" className="text-danger text-decoration-none fw-bold">
                        Click here to create an account →
                      </Link>
                    </div>
                  )}
                </Alert>
              )}


              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <div className="position-relative">
                    <Envelope className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="ps-5"
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Lock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="ps-5"
                      required
                    />
                  </div>
                </Form.Group>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Form>

              <div className="text-center mb-3">
                <span className="text-muted">or</span>
              </div>

              <Button 
                variant="outline-primary" 
                className="w-100 mb-3"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Google className="me-2" size={20} />
                    Sign in with Google
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary text-decoration-none">
                    Sign up here
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login