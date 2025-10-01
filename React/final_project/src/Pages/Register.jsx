import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with image */}
      <div className="relative h-64 w-full">
       
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute left-[8%] top-1/2 transform -translate-y-1/2 text-white">
          <h1 className="text-4xl font-normal mb-3">Register</h1>
          <div className="text-base">
            <Link to="/" className="hover:underline">Homepage</Link> <span>&gt;</span> <span>Account</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-12 py-16 px-8">

        {/* Register Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-normal mb-8">Register</h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Username or email address*"
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-base focus:outline-none focus:border-black"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password*"
                className="w-full px-4 py-3 rounded-md border border-gray-300 text-base focus:outline-none focus:border-black"
              />
              <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                👁
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password*"
                className="w-full px-4 py-3 rounded-md border border-gray-300 text-base focus:outline-none focus:border-black"
              />
              <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                👁
              </span>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-black" defaultChecked />
              I agree to the <span className="underline cursor-pointer">Terms of User</span>
            </label>

            <button
              type="submit"
              className="bg-black text-white rounded-full px-10 py-3 text-lg font-medium hover:bg-gray-900 transition"
            >
              Register
            </button>
          </form>
        </div>

        {/* Already have account */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-normal mb-3">Already have an account?</h2>
          <p className="text-gray-500 mb-8">
            Welcome back. Sign in to access your personalized experience, saved
            preferences, and more. We’re thrilled to have you with us again!
          </p>
          <Link to="/login">
            <button className="bg-black text-white rounded-full px-10 py-3 text-lg font-medium hover:bg-gray-900 transition">
              Login
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
