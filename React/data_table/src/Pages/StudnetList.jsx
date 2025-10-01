import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import '../actionButtons.css';

const StudnetList = () => {
    const [students, setStudents] = useState([])
    const [selectedCourse, setSelectedCourse] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'
    const [currentPage, setCurrentPage] = useState(1)
    const studentsPerPage = 5

    const getStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/students')
            setStudents(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getStudents()
    }, [])

    // delete student
    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/students/${id}`)
            getStudents()
        } catch (error) {
            console.log(error)
        }
    }

    // Get unique courses for filter dropdown
    const courses = ['All', ...Array.from(new Set(students.map(s => s.course).filter(Boolean)))]

    // Filter, search, and sort students
    const filteredStudents = students
        .filter(student => selectedCourse === 'All' || student.course === selectedCourse)
        .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name)
            } else { 
                return b.name.localeCompare(a.name)
            }
        })

    // Pagination logic
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
    const startIndex = (currentPage - 1) * studentsPerPage
    const endIndex = startIndex + studentsPerPage
    const currentStudents = filteredStudents.slice(startIndex, endIndex)

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedCourse, searchTerm, sortOrder])

    // Pagination handlers
    const goToPage = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }

    const goToPreviousPage = () => {
        goToPage(currentPage - 1)
    }

    const goToNextPage = () => {
        goToPage(currentPage + 1)
    }

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            }
        }
        
        return pages
    }

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center drop-shadow">Student List</h1>
            {/* Filter and Search Controls */}
            <div className="flex flex-col md:flex-row gap-6 mb-8 items-center justify-between w-full">
                {/* Filter by Course */}
                <div className="flex gap-3 items-center bg-white shadow-md rounded-xl px-5 py-3 border border-gray-200">
                    <label htmlFor="course-filter" className="font-semibold text-gray-700 text-base">Filter by Course:</label>
                    <select
                        id="course-filter"
                        value={selectedCourse}
                        onChange={e => setSelectedCourse(e.target.value)}
                        className="appearance-none border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 bg-gray-50 hover:bg-gray-100 shadow-sm"
                    >
                        {courses.map(course => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                </div>
                {/* Search and Sort */}
                <div className="flex gap-3 items-center bg-white shadow-md rounded-xl px-5 py-3 border border-gray-200">
                    <div className="relative w-56">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 bg-gray-50 hover:bg-gray-100 shadow-sm"
                        />
                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </div>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className={`px-4 py-2 rounded-lg font-semibold shadow-sm border border-gray-300 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 ${sortOrder === 'asc' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        title={`Sort ${sortOrder === 'asc' ? 'A-Z' : 'Z-A'}`}
                    >
                        {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="p-3 text-left font-semibold text-gray-700 rounded-tl-2xl">Name
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                                    title={`Sort ${sortOrder === 'asc' ? 'A-Z' : 'Z-A'}`}
                                >
                                    {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                                </button>
                            </th>
                            <th className="p-3 text-left font-semibold text-gray-700">Email</th>
                            <th className="p-3 text-left font-semibold text-gray-700">Phone</th>
                            <th className="p-3 text-left font-semibold text-gray-700">Course</th>
                            <th className="p-3 text-left font-semibold text-gray-700">Address</th>
                            <th className="p-3 text-left font-semibold text-gray-700">Gender</th>
                            <th className="p-3 text-left font-semibold text-gray-700">Age</th>
                            <th className="p-3 text-center font-semibold text-gray-700 rounded-tr-2xl">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((student, idx) => (
                            <tr
                                key={student.id}
                                className={
                                    `transition-colors ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`
                                }
                            >
                                <td className='p-3 text-gray-800'>{student.name}</td>
                                <td className='p-3 text-gray-800'>{student.email}</td>
                                <td className='p-3 text-gray-800'>{student.phone}</td>
                                <td className='p-3 text-gray-800'>{student.course}</td>
                                <td className='p-3 text-gray-800'>{student.address}</td>
                                <td className='p-3 text-gray-800'>{student.gender}</td>
                                <td className='p-3 text-gray-800'>{student.age}</td>
                                <td className='p-3 flex justify-center items-center gap-2'>
                                    <Link
                                        to={`/student-form/${student.id}`}
                                        className="action-btn edit flex items-center gap-1 py-2 px-4 rounded-lg font-semibold shadow"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                        Edit
                                    </Link>
                                    <button
                                        className="action-btn delete flex items-center gap-1 py-2 px-4 rounded-lg font-semibold shadow"
                                        onClick={() => deleteStudent(student.id)}
                                        title="Delete"
                                    >
                                        <FaTrash />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all duration-150 mr-2 ${
                            currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
                        }`}
                    >
                        <FaChevronLeft className="text-sm" /> Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`mx-1 px-3 py-2 rounded-lg font-medium transition-all duration-150 ${
                                page === currentPage
                                    ? 'bg-blue-500 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all duration-150 ml-2 ${
                            currentPage === totalPages
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
                        }`}
                    >
                        Next <FaChevronRight className="text-sm" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default StudnetList