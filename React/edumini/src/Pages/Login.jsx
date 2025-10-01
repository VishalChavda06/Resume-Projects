import { useState } from "react"
import { getUser } from "../utils/auth"
import { useNavigate } from "react-router-dom"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Link } from "react-router-dom"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const savedUser = getUser()
    console.log("Saved User:", savedUser) // Debugging log
    console.log("Form Data:", form) // Debugging log

    if (savedUser && savedUser.email === form.email && savedUser.password === form.password) {
      localStorage.setItem("loggedIn", "true")
      navigate("/") // Redirect to Dashboard on successful login
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4 w-[300px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Login</h2>

        <div>
          <Label className="mb-2">Email</Label>
          <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        </div>

        <div>
          <Label className="mb-2">Password</Label>
          <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" />
        </div>

        <Button type="submit" className="w-full">Login</Button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
        </p>
      </form>
    </div>
  )
}
