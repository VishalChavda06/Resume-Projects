import './App.css'
import Navbar from './Components/Navbar'
import StudentForm from './Pages/StudentForm'
import StudnetList from './Pages/StudnetList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CouresPage from './Pages/CouresPage'
function App() {

  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path="/" element={<StudnetList />} />
          <Route path="/student-form" element={<StudentForm />} />
          <Route path="/student-form/:id" element={<StudentForm />} />
          <Route path="/course" element={<CouresPage />} />
        </Routes>
      </BrowserRouter>

    </>
  )

}

export default App
