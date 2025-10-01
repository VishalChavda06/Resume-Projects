// Student Action Types
export const STUDENT_ACTION_TYPES = {
  // Fetch Students
  FETCH_STUDENTS_START: 'FETCH_STUDENTS_START',
  FETCH_STUDENTS_SUCCESS: 'FETCH_STUDENTS_SUCCESS',
  FETCH_STUDENTS_FAILURE: 'FETCH_STUDENTS_FAILURE',
  
  // Fetch Single Student
  FETCH_STUDENT_START: 'FETCH_STUDENT_START',
  FETCH_STUDENT_SUCCESS: 'FETCH_STUDENT_SUCCESS',
  FETCH_STUDENT_FAILURE: 'FETCH_STUDENT_FAILURE',
  
  // Add Student
  ADD_STUDENT_START: 'ADD_STUDENT_START',
  ADD_STUDENT_SUCCESS: 'ADD_STUDENT_SUCCESS',
  ADD_STUDENT_FAILURE: 'ADD_STUDENT_FAILURE',
  
  // Update Student
  UPDATE_STUDENT_START: 'UPDATE_STUDENT_START',
  UPDATE_STUDENT_SUCCESS: 'UPDATE_STUDENT_SUCCESS',
  UPDATE_STUDENT_FAILURE: 'UPDATE_STUDENT_FAILURE',
  
  // Delete Student
  DELETE_STUDENT_START: 'DELETE_STUDENT_START',
  DELETE_STUDENT_SUCCESS: 'DELETE_STUDENT_SUCCESS',
  DELETE_STUDENT_FAILURE: 'DELETE_STUDENT_FAILURE',
  
  // Clear Messages
  CLEAR_STUDENT_MESSAGES: 'CLEAR_STUDENT_MESSAGES',
  CLEAR_SELECTED_STUDENT: 'CLEAR_SELECTED_STUDENT'
}

// Action Creators for Fetching Students
export const fetchStudentsStart = () => ({
  type: STUDENT_ACTION_TYPES.FETCH_STUDENTS_START
})

export const fetchStudentsSuccess = (students) => ({
  type: STUDENT_ACTION_TYPES.FETCH_STUDENTS_SUCCESS,
  payload: students
})

export const fetchStudentsFailure = (error) => ({
  type: STUDENT_ACTION_TYPES.FETCH_STUDENTS_FAILURE,
  payload: error
})

// Action Creators for Fetching Single Student
export const fetchStudentStart = () => ({
  type: STUDENT_ACTION_TYPES.FETCH_STUDENT_START
})

export const fetchStudentSuccess = (student) => ({
  type: STUDENT_ACTION_TYPES.FETCH_STUDENT_SUCCESS,
  payload: student
})

export const fetchStudentFailure = (error) => ({
  type: STUDENT_ACTION_TYPES.FETCH_STUDENT_FAILURE,
  payload: error
})

// Action Creators for Adding Student
export const addStudentStart = () => ({
  type: STUDENT_ACTION_TYPES.ADD_STUDENT_START
})

export const addStudentSuccess = (student) => ({
  type: STUDENT_ACTION_TYPES.ADD_STUDENT_SUCCESS,
  payload: student
})

export const addStudentFailure = (error) => ({
  type: STUDENT_ACTION_TYPES.ADD_STUDENT_FAILURE,
  payload: error
})

// Action Creators for Updating Student
export const updateStudentStart = () => ({
  type: STUDENT_ACTION_TYPES.UPDATE_STUDENT_START
})

export const updateStudentSuccess = (student) => ({
  type: STUDENT_ACTION_TYPES.UPDATE_STUDENT_SUCCESS,
  payload: student
})

export const updateStudentFailure = (error) => ({
  type: STUDENT_ACTION_TYPES.UPDATE_STUDENT_FAILURE,
  payload: error
})

// Action Creators for Deleting Student
export const deleteStudentStart = () => ({
  type: STUDENT_ACTION_TYPES.DELETE_STUDENT_START
})

export const deleteStudentSuccess = (studentId) => ({
  type: STUDENT_ACTION_TYPES.DELETE_STUDENT_SUCCESS,
  payload: studentId
})

export const deleteStudentFailure = (error) => ({
  type: STUDENT_ACTION_TYPES.DELETE_STUDENT_FAILURE,
  payload: error
})

// Action Creators for Clearing Messages
export const clearStudentMessages = () => ({
  type: STUDENT_ACTION_TYPES.CLEAR_STUDENT_MESSAGES
})

export const clearSelectedStudent = () => ({
  type: STUDENT_ACTION_TYPES.CLEAR_SELECTED_STUDENT
})
