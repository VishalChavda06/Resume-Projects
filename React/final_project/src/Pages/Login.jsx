import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen ">
      {/* Header Section */}
      <div className="h-[250px] text-white py-12 bg-[url('https://gearo-html.vercel.app/images/page-title/page-title-5.jpg')] bg-fixed ">
        <div className="max-w-[1100px] mx-auto px-8">
          <h1 className="text-4xl font-semibold mb-2">Login</h1>
          <div className="text-base text-white">
            <Link to="/" className="hover:underline">
              Homepage
            </Link>{" "}
            <span>&gt;</span> <span>Account</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1100px] mx-auto mt-12 flex flex-col md:flex-row gap-12 px-8">
        {/* Login Form */}
        <div className="flex-1 p-8 bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-normal mb-6">Login</h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Username or email address*"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:border-black"
            />
            <input
              type="password"
              placeholder="Password*"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:border-black"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-black" /> Remember me
              </label>
              <Link to="#" className="text-sm text-black underline">
                Forgot Your Password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-black text-white rounded-full px-8 py-3 text-lg font-medium hover:bg-gray-900 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* Register Section */}
        <div className="flex-1 p-8 bg-white rounded-2xl shadow-md text-center flex flex-col justify-center">
          <h2 className="text-2xl font-normal mb-6">New Customer</h2>
          <p className="text-base text-gray-700 mb-10">
            Be part of our growing family of new customers! Join us today and
            unlock a world of exclusive benefits, offers, and personalized
            experiences.
          </p>
          <Link to="/register">
            <button className="bg-black text-white rounded-full px-8 py-3 text-lg font-medium hover:bg-gray-900 transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
