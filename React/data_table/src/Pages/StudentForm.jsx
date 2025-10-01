import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const StudentForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/students/${id}`)
        .then(res => {
          const s = res.data
          setName(s.name || '')
          setEmail(s.email || '')
          setPhone(s.phone || '')
          setCourse(s.course || '')
          setAddress(s.address || '')
          setGender(s.gender || '')
          setAge(s.age || '')
        })
        .catch(err => console.error(err))
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const student = { name, email, phone, course, address, gender, age }
    try {
      if (id) {
        await axios.put(`http://localhost:5000/students/${id}`, student)
      } else {
        await axios.post('http://localhost:5000/students', student)
      }
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-2">
      <div className="bg-white shadow rounded-lg w-full max-w-xl border border-gray-200">
        <div className="px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">{id ? 'Update Student' : 'Add Student'}</h1>
        </div>
        <form className="flex flex-col gap-6 px-8 py-8" onSubmit={handleSubmit}>
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
              <input required className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 transition" type="text" id="name" name="name" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
              <input required className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 transition" type="email" id="email" name="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          {/* Phone & Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-medium text-gray-700">Phone <span className="text-red-500">*</span></label>
              <input required className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 transition" type="tel" id="phone" name="phone" placeholder='Enter your phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="age" className="font-medium text-gray-700">Age <span className="text-red-500">*</span></label>
              <input required className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 transition" type="number" id="age" name="age" placeholder='Enter your age' value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
          </div>
          {/* Course & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="course" className="font-medium text-gray-700">Course <span className="text-red-500">*</span></label>
              <select required className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 transition" id="course" name="course" value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="">Select a course</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="BBA">BBA</option>
                <option value="MBA">MBA</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="B.Sc">B.Sc</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-6 h-full mt-1">
                <label className="inline-flex items-center cursor-pointer">
                  <input required type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} className="form-radio text-gray-700 focus:ring-gray-400" />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input required type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} className="form-radio text-gray-700 focus:ring-gray-400" />
                  <span className="ml-2 text-gray-700">Female</span>
                </label>
              </div>
            </div>
          </div>
          {/* Address */}
          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
            <textarea required className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 transition resize-none" id="address" name="address" placeholder='Enter your address' value={address} onChange={(e) => setAddress(e.target.value)} rows={2} />
          </div>
          <button className='mt-4 bg-gray-800 text-white p-3 rounded font-semibold hover:bg-gray-900 transition-all duration-200 text-base' type='submit'>
            {id ? 'Update Student' : 'Add Student'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default StudentForm