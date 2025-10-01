import { Switch } from "@/components/ui/switch"
import { useTheme } from "../../../context/ThemeProvider"
import { logoutUser, getUser } from "../../../utils/auth"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Header() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = getUser()
    setUser(loggedInUser)
    // if (loggedInUser) {
    //   toast.success(`Welcome, ${loggedInUser.email}.`, {
    //     position: "top-right",
    //     autoClose: 3000,
    //   })
    // }
   
  }, [])

  const handleLogout = () => {
    logoutUser()
    localStorage.removeItem("loggedIn")
    toast.info("You have logged out.", {
      position: "top-right",
      autoClose: 3000,
    })
    setTimeout(() => {
      navigate("/register")
    }, 3000) // Delay navigation by 3 seconds to allow the toast to display
  }
  const { darkMode, setDarkMode } = useTheme()

  return (
    <>
      <header className="w-full z-40 bg-white dark:bg-gray-900 dark:text-white shadow-sm px-6 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        {/* Left side: Brand + Dark mode */}
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400">EduMini</span> LMS
          </h1>

          <div className="flex items-center gap-2">
            <label
              htmlFor="dark-mode-toggle"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Dark Mode
            </label>
            <Switch
              id="dark-mode-toggle"
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
            />
          </div>
        </div>

        {/* Right side: User + Logout */}
        <div className="flex items-center gap-6">
          {user && (
            <div className="flex items-center gap-3">
              <img
                src="https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
                alt="User Icon"
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
              />
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {user.email}
              </p>
            </div>
          )}

          <Button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 shadow-sm"
          >
            Logout
          </Button>
        </div>
      </header>
      <ToastContainer />
    </>
  )
}
