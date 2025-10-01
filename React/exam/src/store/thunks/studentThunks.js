import {
  fetchStudentsStart,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  fetchStudentStart,
  fetchStudentSuccess,
  fetchStudentFailure,
  addStudentStart,
  addStudentSuccess,
  addStudentFailure,
  updateStudentStart,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudentStart,
  deleteStudentSuccess,
  deleteStudentFailure
} from '../actions/studentActions'
import { studentAPI } from '../../services/api'

// Fetch all students thunk
export const fetchStudents = () => {
  return async (dispatch) => {
    dispatch(fetchStudentsStart())
    
    try {
      const response = await studentAPI.getAllStudents()
      dispatch(fetchStudentsSuccess(response.data))
    } catch (error) {
      console.error('Error fetching students:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch students'
      dispatch(fetchStudentsFailure(errorMessage))
    }
  }
}

// Fetch single student thunk
export const fetchStudent = (studentId) => {
  return async (dispatch) => {
    dispatch(fetchStudentStart())
    
    try {
      const response = await studentAPI.getStudentById(studentId)
      dispatch(fetchStudentSuccess(response.data))
    } catch (error) {
      console.error('Error fetching student:', error)
      let errorMessage = 'Failed to fetch student'
      
      if (error.response?.status === 404) {
        errorMessage = 'Student not found'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      dispatch(fetchStudentFailure(errorMessage))
    }
  }
}

// Add new student thunk
export const addStudent = (studentData) => {
  return async (dispatch) => {
    dispatch(addStudentStart())
    
    try {
      const response = await studentAPI.createStudent(studentData)
      dispatch(addStudentSuccess(response.data))
      return response.data
    } catch (error) {
      console.error('Error adding student:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add student'
      dispatch(addStudentFailure(errorMessage))
      throw error
    }
  }
}

// Update student thunk
export const updateStudent = (studentId, studentData) => {
  return async (dispatch) => {
    dispatch(updateStudentStart())
    
    try {
      const response = await studentAPI.updateStudent(studentId, studentData)
      dispatch(updateStudentSuccess(response.data))
      return response.data
    } catch (error) {
      console.error('Error updating student:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update student'
      dispatch(updateStudentFailure(errorMessage))
      throw error
    }
  }
}

// Delete student thunk
export const deleteStudent = (studentId) => {
  return async (dispatch) => {
    dispatch(deleteStudentStart())
    
    try {
      await studentAPI.deleteStudent(studentId)
      dispatch(deleteStudentSuccess(studentId))
    } catch (error) {
      console.error('Error deleting student:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete student'
      dispatch(deleteStudentFailure(errorMessage))
      throw error
    }
  }
}

// Mock data thunks for development/testing
// You can use these when you don't have a backend yet

// Mock fetch students
export const fetchStudentsMock = () => {
  return async (dispatch) => {
    dispatch(fetchStudentsStart())
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      const mockStudents = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 (555) 123-4567',
          course: 'Computer Science',
          address: '123 Main Street, City, State 12345',
          dateOfBirth: '1995-05-15',
          status: 'Active',
          enrollmentDate: '2023-09-01',
          gpa: '3.8'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1 (555) 987-6543',
          course: 'Mathematics',
          address: '456 Oak Avenue, City, State 12345',
          dateOfBirth: '1996-08-22',
          status: 'Active',
          enrollmentDate: '2023-09-01',
          gpa: '3.9'
        },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          phone: '+1 (555) 456-7890',
          course: 'Physics',
          address: '789 Pine Road, City, State 12345',
          dateOfBirth: '1994-12-10',
          status: 'Inactive',
          enrollmentDate: '2022-09-01',
          gpa: '3.5'
        }
      ]
      
      dispatch(fetchStudentsSuccess(mockStudents))
    } catch (error) {
      dispatch(fetchStudentsFailure(error.message))
    }
  }
}

// Mock fetch single student
export const fetchStudentMock = (studentId) => {
  return async (dispatch) => {
    dispatch(fetchStudentStart())
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock data
      const mockStudent = {
        id: parseInt(studentId),
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        course: 'Computer Science',
        address: '123 Main Street, City, State 12345',
        dateOfBirth: '1995-05-15',
        status: 'Active',
        enrollmentDate: '2023-09-01',
        gpa: '3.8'
      }
      
      dispatch(fetchStudentSuccess(mockStudent))
    } catch (error) {
      dispatch(fetchStudentFailure(error.message))
    }
  }
}

// Mock add student
export const addStudentMock = (studentData) => {
  return async (dispatch) => {
    dispatch(addStudentStart())
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create new student with generated ID
      const newStudent = {
        id: Date.now(), // Simple ID generation
        ...studentData,
        enrollmentDate: new Date().toISOString().split('T')[0],
        gpa: '0.0'
      }
      
      dispatch(addStudentSuccess(newStudent))
      return newStudent
    } catch (error) {
      dispatch(addStudentFailure(error.message))
      throw error
    }
  }
}

// Mock delete student
export const deleteStudentMock = (studentId) => {
  return async (dispatch) => {
    dispatch(deleteStudentStart())
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      dispatch(deleteStudentSuccess(studentId))
    } catch (error) {
      dispatch(deleteStudentFailure(error.message))
      throw error
    }
  }
}
