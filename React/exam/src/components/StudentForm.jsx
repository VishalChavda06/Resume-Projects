import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { ArrowLeft, Save } from 'react-bootstrap-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addStudent, updateStudent, fetchStudent } from '../store/thunks/studentThunks'
import { clearStudentMessages } from '../store/actions/studentActions'

const StudentForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  
  const { 
    addStudentLoading, 
    addStudentError, 
    addStudentSuccess,
    updateStudentLoading,
    updateStudentError,
    updateStudentSuccess,
    selectedStudent,
    studentLoading
  } = useSelector(state => state.students)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    address: '',
    dateOfBirth: '',
    status: 'Active'
  })

  useEffect(() => {
    // Load student data for editing
    if (isEditMode && id) {
      dispatch(fetchStudent(id))
    }
  }, [isEditMode, id, dispatch])

  useEffect(() => {
    // Populate form with student data when editing
    if (isEditMode && selectedStudent) {
      setFormData({
        name: selectedStudent.name || '',
        email: selectedStudent.email || '',
        phone: selectedStudent.phone || '',
        course: selectedStudent.course || '',
        address: selectedStudent.address || '',
        dateOfBirth: selectedStudent.dateOfBirth || '',
        status: selectedStudent.status || 'Active'
      })
    }
  }, [isEditMode, selectedStudent])

  useEffect(() => {
    // Navigate to students list after successful submission
    if (addStudentSuccess || updateStudentSuccess) {
      dispatch(clearStudentMessages())
      navigate('/students')
    }
  }, [addStudentSuccess, updateStudentSuccess, navigate, dispatch])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditMode) {
        await dispatch(updateStudent(id, formData))
      } else {
        await dispatch(addStudent(formData))
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center">
            <Button as={Link} to="/students" variant="outline-secondary" className="me-3">
              <ArrowLeft size={16} />
            </Button>
            <h2>{isEditMode ? 'Edit Student' : 'Add New Student'}</h2>
          </div>
        </Col>
      </Row>

      {(addStudentError || updateStudentError) && (
        <Alert variant="danger" dismissible onClose={() => dispatch(clearStudentMessages())}>
          {addStudentError || updateStudentError}
        </Alert>
      )}

      {studentLoading && (
        <Container className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading student data...</p>
        </Container>
      )}

      <Row>
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter full name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter email address"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Course *</Form.Label>
                      <Form.Select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a course</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="Engineering">Engineering</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={addStudentLoading || updateStudentLoading}
                  >
                    {(addStudentLoading || updateStudentLoading) ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        {isEditMode ? 'Updating...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        <Save className="me-2" size={16} />
                        {isEditMode ? 'Update Student' : 'Save Student'}
                      </>
                    )}
                  </Button>
                  <Button as={Link} to="/students" variant="outline-secondary">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default StudentForm