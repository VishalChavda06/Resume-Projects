import { combineReducers } from 'redux'
import studentReducer from './studentReducer'

// Root Reducer
const rootReducer = combineReducers({
  students: studentReducer
})

export default rootReducer
