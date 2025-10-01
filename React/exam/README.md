# Student Management System

A comprehensive React application for managing student information with Redux state management and CRUD operations.

## Features

- ✅ **Student CRUD Operations**: Create, Read, Update, Delete students
- ✅ **Redux State Management**: Centralized state with actions, reducers, and thunks
- ✅ **Axios HTTP Client**: Professional API communication
- ✅ **JSON Server**: Mock backend with persistent data
- ✅ **React Bootstrap**: Modern, responsive UI components
- ✅ **React Router**: Client-side routing
- ✅ **Loading States**: User feedback during async operations
- ✅ **Error Handling**: Comprehensive error management

## Tech Stack

- **Frontend**: React 19, Redux, React Router
- **UI Library**: React Bootstrap, Bootstrap Icons
- **HTTP Client**: Axios
- **Backend**: JSON Server
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd exam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the JSON Server** (Backend API)
   ```bash
   npm run json-server
   ```
   This will start the JSON server on `http://localhost:3000`

4. **Start the React Development Server** (in a new terminal)
   ```bash
   npm run dev
   ```
   This will start the React app on `http://localhost:5173`

### Usage

1. **View Students**: Navigate to `/students` to see all students
2. **Add Student**: Click "Add New Student" to create a new student
3. **View Details**: Click "View" on any student card to see detailed information
4. **Edit Student**: Click "Edit" to modify student information (feature ready for implementation)
5. **Delete Student**: Click "Delete" to remove a student (with confirmation)

## API Endpoints

The JSON server provides the following REST API endpoints:

- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.jsx      # Navigation component
│   ├── StudentList.jsx # Student listing component
│   ├── StudentForm.jsx # Student form component
│   └── StudentDetails.jsx # Student details component
├── store/              # Redux store
│   ├── actions/        # Action creators
│   ├── reducers/       # Reducers
│   └── thunks/         # Async thunks
├── services/           # API services
│   └── api.js         # Axios configuration
└── App.jsx            # Main application component
```

## Redux State Structure

```javascript
{
  students: {
    students: [],           // Array of all students
    studentsLoading: false, // Loading state for fetch all
    studentsError: null,    // Error state for fetch all
    
    selectedStudent: null,  // Currently selected student
    studentLoading: false,  // Loading state for fetch single
    studentError: null,     // Error state for fetch single
    
    addStudentLoading: false,    // Loading state for add
    addStudentError: null,       // Error state for add
    addStudentSuccess: false,    // Success state for add
    
    updateStudentLoading: false, // Loading state for update
    updateStudentError: null,    // Error state for update
    updateStudentSuccess: false, // Success state for update
    
    deleteStudentLoading: false, // Loading state for delete
    deleteStudentError: null,    // Error state for delete
    deleteStudentSuccess: false  // Success state for delete
  }
}
```

## Development

### Available Scripts

- `npm run dev` - Start React development server
- `npm run build` - Build for production
- `npm run json-server` - Start JSON server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New API Endpoints**: Add to `src/services/api.js`
2. **New Actions**: Add to `src/store/actions/studentActions.js`
3. **New Thunks**: Add to `src/store/thunks/studentThunks.js`
4. **State Updates**: Modify `src/store/reducers/studentReducer.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.