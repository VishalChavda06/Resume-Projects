import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Envelope, Lock, Person, Google } from 'react-bootstrap-icons'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { signup, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error and success when user starts typing
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (!formData.name.trim()) {
      setError('Name is required')
      return
    }

    setLoading(true)

    try {
      console.log('Attempting registration with:', formData.email)
      // Always use JSON Server for manual registration
      const result = await signup(
        formData.name, 
        formData.email, 
        formData.password, 
        'json'
      )
      console.log('Registration result:', result)
      if (result.success) {
        console.log('Registration successful, showing success message')
        setSuccess('Account created successfully! Please login to continue.')
        // Clear form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        console.log('Registration failed:', result.error)
        setError(result.error)
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('Failed to create account')
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
      setError('Failed to sign up with Google')
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
                <h2 className="fw-bold text-primary">Create Account</h2>
                <p className="text-muted">Sign up to get started</p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                  {error.includes('already registered') && (
                    <div className="mt-2">
                      <Link to="/login" className="text-danger text-decoration-none fw-bold">
                        Click here to sign in instead →
                      </Link>
                    </div>
                  )}
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="mb-3">
                  {success}
                </Alert>
              )}


              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <div className="position-relative">
                    <Person className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="ps-5"
                      required
                    />
                  </div>
                </Form.Group>

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
                  <Form.Text className="text-muted">
                    Password must be at least 6 characters
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <div className="position-relative">
                    <Lock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
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
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
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
                    Signing Up...
                  </>
                ) : (
                  <>
                    <Google className="me-2" size={20} />
                    Sign up with Google
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary text-decoration-none">
                    Sign in here
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

export default Register