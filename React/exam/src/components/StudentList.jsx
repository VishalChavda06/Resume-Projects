import React, { useEffect } from 'react'
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner } from 'react-bootstrap'
import { PersonPlus, Eye, PencilSquare, Trash, People } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStudents, deleteStudent } from '../store/thunks/studentThunks'
import { clearStudentMessages } from '../store/actions/studentActions'

const StudentList = () => {
  const dispatch = useDispatch()
  const { 
    students, 
    studentsLoading, 
    studentsError, 
    deleteStudentLoading,
    deleteStudentError,
    deleteStudentSuccess
  } = useSelector(state => state.students)

  useEffect(() => {
    // Fetch students when component mounts
    dispatch(fetchStudents())
  }, [dispatch])

  useEffect(() => {
    // Clear messages after successful operations
    if (deleteStudentSuccess) {
      dispatch(clearStudentMessages())
    }
  }, [deleteStudentSuccess, dispatch])

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await dispatch(deleteStudent(studentId))
      } catch (err) {
        console.error('Failed to delete student:', err)
      }
    }
  }

  if (studentsLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading students...</p>
      </Container>
    )
  }

  if (studentsError) {
    return (
      <Container>
        <Alert variant="danger">
          {studentsError}
        </Alert>
        <Button onClick={() => dispatch(fetchStudents())} variant="outline-primary">
          Try Again
        </Button>
      </Container>
    )
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Student List</h2>
            <Button as={Link} to="/add-student" variant="primary">
              <PersonPlus className="me-2" size={16} />
              Add New Student
            </Button>
          </div>
        </Col>
      </Row>
      
      {students.length === 0 ? (
        <Row>
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <People size={64} className="text-muted mb-3" />
                <h4>No Students Found</h4>
                <p className="text-muted">Get started by adding your first student.</p>
                <Button as={Link} to="/add-student" variant="primary">
                  <PersonPlus className="me-2" size={16} />
                  Add New Student
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          {students.map((student) => (
            <Col key={student.id} md={6} lg={4} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    {student.name}
                    <Badge bg={student.status === 'Active' ? 'success' : 'secondary'}>
                      {student.status}
                    </Badge>
                  </Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {student.email}<br />
                    <strong>Course:</strong> {student.course}
                  </Card.Text>
                  <div className="d-flex gap-2">
                    <Button 
                      as={Link} 
                      to={`/student/${student.id}`} 
                      variant="outline-primary" 
                      size="sm"
                    >
                      <Eye className="me-1" size={14} />
                      View
                    </Button>
                    <Button 
                      as={Link} 
                      to={`/edit-student/${student.id}`} 
                      variant="outline-warning" 
                      size="sm"
                    >
                      <PencilSquare className="me-1" size={14} />
                      Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <Trash className="me-1" size={14} />
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default StudentList