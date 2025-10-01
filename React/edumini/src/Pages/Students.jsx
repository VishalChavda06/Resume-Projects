import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Button } from "../components/ui/button"
import Sidebar from "../components/ui/layout/Sidebar"
import Header from "../components/ui/layout/Header"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Students() {
  const [students, setStudents] = useState([])
  const [newStudent, setNewStudent] = useState({ name: "", email: "", course: "" })
  const [editMode, setEditMode] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [courses, setCourses] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn")
    if (!isLoggedIn) {
      navigate("/register")
    }

    const savedStudents = localStorage.getItem("students")
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    }

    const savedCourses = localStorage.getItem("courses")
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
    }
  }, [navigate])

  const handleAddOrUpdate = () => {
    if (editMode && editIndex !== null) {
      const updated = [...students]
      updated[editIndex] = { id: students[editIndex].id, ...newStudent }
      setStudents(updated)
      localStorage.setItem("students", JSON.stringify(updated))
      toast.success("Student updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      })
    } else {
      const id = students.length > 0 ? students[students.length - 1].id + 1 : 1; // Generate sequential ID
      const updated = [...students, { id, ...newStudent }]
      setStudents(updated)
      localStorage.setItem("students", JSON.stringify(updated))
      toast.success("Student added successfully!", {
        position: "top-right",
        autoClose: 3000,
      })
    }

    setNewStudent({ name: "", email: "", course: "" })
    setEditMode(false)
    setEditIndex(null)
    document.body.click(); // Close the dialog box
  }

  const handleEdit = (student, index) => {
    setNewStudent({
      name: student.name,
      email: student.email,
      course: student.course,
    })
    setEditMode(true)
    setEditIndex(index)
  }

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updated = [...students]
      updated.splice(index, 1)
      setStudents(updated)
      localStorage.setItem("students", JSON.stringify(updated))
      toast.success("Student deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Management</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditMode(false)
                  setNewStudent({ name: "", email: "", course: "" })
                }}>
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editMode ? "Edit Student" : "Add New Student"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label className="mb-2">Name</Label>
                    <Input
                      type="text"
                      value={newStudent.name}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, name: e.target.value })
                      }
                      placeholder="Enter student name"
                    />
                  </div>
                  <div>
                    <Label className="mb-3">Email</Label>
                    <Input
                      type="email"
                      value={newStudent.email}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, email: e.target.value })
                      }
                      placeholder="Enter student email"
                    />
                  </div>
                  <div>
                    <Label className="mb-3">Course</Label>
                    <Select
                      value={newStudent.course}
                      onValueChange={(value) =>
                        setNewStudent({ ...newStudent, course: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.name}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddOrUpdate} className="w-full">
                    {editMode ? "Update" : "Add"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(student, index)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Student</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <Label className="mb-3">Name</Label>
                            <Input
                              type="text"
                              value={newStudent.name}
                              onChange={(e) =>
                                setNewStudent({ ...newStudent, name: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <Label className="mb-3">Email</Label>
                            <Input
                              type="email"
                              value={newStudent.email}
                              onChange={(e) =>
                                setNewStudent({ ...newStudent, email: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <Label className="mb-3">Course</Label>
                            <Select
                              value={newStudent.course}
                              onValueChange={(value) =>
                                setNewStudent({ ...newStudent, course: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Course" />
                              </SelectTrigger>
                              <SelectContent>
                                {courses.map((course) => (
                                  <SelectItem key={course.id} value={course.name}>
                                    {course.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={handleAddOrUpdate} className="w-full">
                            Update
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
