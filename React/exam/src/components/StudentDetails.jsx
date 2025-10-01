import React, { useEffect } from 'react'
import { Container, Row, Col, Card, Button, Badge, ListGroup, Alert, Spinner } from 'react-bootstrap'
import { ArrowLeft, PencilSquare, Trash, Envelope, Telephone, GeoAlt, Calendar, Book, Person } from 'react-bootstrap-icons'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStudent, deleteStudent } from '../store/thunks/studentThunks'
import { clearStudentMessages, clearSelectedStudent } from '../store/actions/studentActions'

const StudentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { 
    selectedStudent, 
    studentLoading, 
    studentError,
    deleteStudentLoading,
    deleteStudentError,
    deleteStudentSuccess
  } = useSelector(state => state.students)

  useEffect(() => {
    if (id) {
      dispatch(fetchStudent(id))
    }
    
    // Cleanup when component unmounts
    return () => {
      dispatch(clearSelectedStudent())
    }
  }, [id, dispatch])

  useEffect(() => {
    // Navigate to students list after successful deletion
    if (deleteStudentSuccess) {
      dispatch(clearStudentMessages())
      navigate('/students')
    }
  }, [deleteStudentSuccess, navigate, dispatch])

  const handleDeleteStudent = async () => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      try {
        await dispatch(deleteStudent(id))
      } catch (err) {
        console.error('Failed to delete student:', err)
      }
    }
  }

  if (studentLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading student details...</p>
      </Container>
    )
  }

  if (studentError) {
    return (
      <Container>
        <Alert variant="danger">
          {studentError}
        </Alert>
        <Button as={Link} to="/students" variant="outline-secondary">
          <ArrowLeft className="me-2" size={16} />
          Back to Students
        </Button>
      </Container>
    )
  }

  if (!selectedStudent) {
    return (
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center">
              <Button as={Link} to="/students" variant="outline-secondary" className="me-3">
                <ArrowLeft size={16} />
              </Button>
              <h2>Student Not Found</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <Person size={64} className="text-muted mb-3" />
                <h4>Student Not Found</h4>
                <p className="text-muted">The student you're looking for doesn't exist or has been removed.</p>
                <Button as={Link} to="/students" variant="primary">
                  <ArrowLeft className="me-2" size={16} />
                  Back to Students
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center">
            <Button as={Link} to="/students" variant="outline-secondary" className="me-3">
              <ArrowLeft size={16} />
            </Button>
            <h2>Student Details</h2>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">{selectedStudent.name}</h4>
              <Badge bg={selectedStudent.status === 'Active' ? 'success' : 'secondary'}>
                {selectedStudent.status}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex align-items-center">
                      <Envelope className="me-3 text-primary" size={20} />
                      <div>
                        <strong>Email:</strong><br />
                        {selectedStudent.email}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center">
                      <Telephone className="me-3 text-primary" size={20} />
                      <div>
                        <strong>Phone:</strong><br />
                        {selectedStudent.phone}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center">
                      <Book className="me-3 text-primary" size={20} />
                      <div>
                        <strong>Course:</strong><br />
                        {selectedStudent.course}
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex align-items-center">
                      <Calendar className="me-3 text-primary" size={20} />
                      <div>
                        <strong>Date of Birth:</strong><br />
                        {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center">
                      <Calendar className="me-3 text-primary" size={20} />
                      <div>
                        <strong>Enrollment Date:</strong><br />
                        {new Date(selectedStudent.enrollmentDate).toLocaleDateString()}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center">
                      <Book className="me-3 text-primary" size={20} />
                      <div>
                        <strong>GPA:</strong><br />
                        {selectedStudent.gpa}
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              
              <Row className="mt-3">
                <Col>
                  <ListGroup.Item className="d-flex align-items-start">
                    <GeoAlt className="me-3 text-primary mt-1" size={20} />
                    <div>
                      <strong>Address:</strong><br />
                      {selectedStudent.address}
                    </div>
                  </ListGroup.Item>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button 
                  as={Link} 
                  to={`/edit-student/${selectedStudent.id}`} 
                  variant="warning"
                >
                  <PencilSquare className="me-2" size={16} />
                  Edit Student
                </Button>
                <Button variant="danger" onClick={handleDeleteStudent}>
                  <Trash className="me-2" size={16} />
                  Delete Student
                </Button>
                <Button as={Link} to="/students" variant="outline-secondary">
                  Back to List
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default StudentDetails