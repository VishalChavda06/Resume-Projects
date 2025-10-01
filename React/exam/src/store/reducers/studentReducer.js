import { STUDENT_ACTION_TYPES } from '../actions/studentActions'

// Initial State
const initialState = {
  // Students list
  students: [],
  studentsLoading: false,
  studentsError: null,
  
  // Single student
  selectedStudent: null,
  studentLoading: false,
  studentError: null,
  
  // Add student
  addStudentLoading: false,
  addStudentError: null,
  addStudentSuccess: false,
  
  // Update student
  updateStudentLoading: false,
  updateStudentError: null,
  updateStudentSuccess: false,
  
  // Delete student
  deleteStudentLoading: false,
  deleteStudentError: null,
  deleteStudentSuccess: false
}

// Student Reducer
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Students Cases
    case STUDENT_ACTION_TYPES.FETCH_STUDENTS_START:
      return {
        ...state,
        studentsLoading: true,
        studentsError: null
      }
    
    case STUDENT_ACTION_TYPES.FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        studentsLoading: false,
        students: action.payload,
        studentsError: null
      }
    
    case STUDENT_ACTION_TYPES.FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        studentsLoading: false,
        studentsError: action.payload
      }
    
    // Fetch Single Student Cases
    case STUDENT_ACTION_TYPES.FETCH_STUDENT_START:
      return {
        ...state,
        studentLoading: true,
        studentError: null
      }
    
    case STUDENT_ACTION_TYPES.FETCH_STUDENT_SUCCESS:
      return {
        ...state,
        studentLoading: false,
        selectedStudent: action.payload,
        studentError: null
      }
    
    case STUDENT_ACTION_TYPES.FETCH_STUDENT_FAILURE:
      return {
        ...state,
        studentLoading: false,
        studentError: action.payload
      }
    
    // Add Student Cases
    case STUDENT_ACTION_TYPES.ADD_STUDENT_START:
      return {
        ...state,
        addStudentLoading: true,
        addStudentError: null,
        addStudentSuccess: false
      }
    
    case STUDENT_ACTION_TYPES.ADD_STUDENT_SUCCESS:
      return {
        ...state,
        addStudentLoading: false,
        students: [...state.students, action.payload],
        addStudentSuccess: true,
        addStudentError: null
      }
    
    case STUDENT_ACTION_TYPES.ADD_STUDENT_FAILURE:
      return {
        ...state,
        addStudentLoading: false,
        addStudentError: action.payload,
        addStudentSuccess: false
      }
    
    // Update Student Cases
    case STUDENT_ACTION_TYPES.UPDATE_STUDENT_START:
      return {
        ...state,
        updateStudentLoading: true,
        updateStudentError: null,
        updateStudentSuccess: false
      }
    
    case STUDENT_ACTION_TYPES.UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        updateStudentLoading: false,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        ),
        selectedStudent: state.selectedStudent?.id === action.payload.id 
          ? action.payload 
          : state.selectedStudent,
        updateStudentSuccess: true,
        updateStudentError: null
      }
    
    case STUDENT_ACTION_TYPES.UPDATE_STUDENT_FAILURE:
      return {
        ...state,
        updateStudentLoading: false,
        updateStudentError: action.payload,
        updateStudentSuccess: false
      }
    
    // Delete Student Cases
    case STUDENT_ACTION_TYPES.DELETE_STUDENT_START:
      return {
        ...state,
        deleteStudentLoading: true,
        deleteStudentError: null,
        deleteStudentSuccess: false
      }
    
    case STUDENT_ACTION_TYPES.DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        deleteStudentLoading: false,
        students: state.students.filter(student => student.id !== action.payload),
        selectedStudent: state.selectedStudent?.id === action.payload 
          ? null 
          : state.selectedStudent,
        deleteStudentSuccess: true,
        deleteStudentError: null
      }
    
    case STUDENT_ACTION_TYPES.DELETE_STUDENT_FAILURE:
      return {
        ...state,
        deleteStudentLoading: false,
        deleteStudentError: action.payload,
        deleteStudentSuccess: false
      }
    
    // Clear Messages Cases
    case STUDENT_ACTION_TYPES.CLEAR_STUDENT_MESSAGES:
      return {
        ...state,
        studentsError: null,
        studentError: null,
        addStudentError: null,
        addStudentSuccess: false,
        updateStudentError: null,
        updateStudentSuccess: false,
        deleteStudentError: null,
        deleteStudentSuccess: false
      }
    
    case STUDENT_ACTION_TYPES.CLEAR_SELECTED_STUDENT:
      return {
        ...state,
        selectedStudent: null,
        studentError: null
      }
    
    default:
      return state
  }
}

export default studentReducer
