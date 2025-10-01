import { useState } from "react"
import { saveUser } from "../utils/auth"
import { useNavigate, Link } from "react-router-dom"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    saveUser(form)
    toast.success("Registration successful! Redirecting to login...", {
      position: "top-right",
      autoClose: 3000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4 w-[300px]">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Register</h2>

          <div>
            <Label className="mb-2">Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}  placeholder="Email"/>
          </div>

          <div>
            <Label className="mb-2">Password</Label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password"/>
          </div>

          <Button type="submit" className="w-full">Register</Button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}