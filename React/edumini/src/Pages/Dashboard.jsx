import React from 'react'
import Sidebar from '../components/ui/layout/Sidebar'
import Header from '../components/ui/layout/Header'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Course Completion Rate",
      data: [65, 59, 80, 81, 56, 75],
      borderColor: "#4F46E5",
      backgroundColor: "rgba(79, 70, 229, 0.2)",
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Performance Overview",
    },
  },
};

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Dashboard Overview
          </h2>

          {/* Quick Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Courses</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Students</h3>
              <p className="text-2xl font-bold text-blue-600">150</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Enrollments</h3>
              <p className="text-2xl font-bold text-blue-600">300</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">Ravi Patel enrolled in "React for Beginners"</li>
              <li className="text-gray-600 dark:text-gray-300">Sneha Mehta completed "Tailwind CSS Mastery"</li>
              <li className="text-gray-600 dark:text-gray-300">New course "Advanced JavaScript" added</li>
            </ul>
          </div>

          {/* Announcements Section */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Announcements</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">New course "Advanced Python" launching next week!</li>
              <li className="text-gray-600 dark:text-gray-300">System maintenance scheduled for June 15, 2025.</li>
              <li className="text-gray-600 dark:text-gray-300">Early bird discounts available for "Machine Learning Mastery".</li>
            </ul>
          </div>

          {/* Performance Charts Section */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Performance Charts</h3>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          

          
        </div>
      </div>
    </div>
  )
}

export default Dashboard
