import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-bold">
                        <h1>Student Management System</h1>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className="text-white hover:text-gray-300">Students</Link>
                        <Link to="/course" className="text-white hover:text-gray-300">Courses</Link>
                        <Link to="/student-form" className="text-white hover:text-gray-300">Register</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar