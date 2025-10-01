import React from 'react'

const BlogDetailsPage = () => {
  return (
    <>
      {/* Hero Banner */}
      <div className="bg-[url('https://gearo-html.vercel.app/images/page-title/page-title-2.jpg')] bg-cover bg-center h-[450px] relative overflow-hidden">
        {/* Left Side Social Media Icons */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10">
          <div className="text-center">
            <div className="text-white text-sm font-medium mb-4">Share:</div>
            <div className="space-y-3">
              <button className="w-12 h-12 bg-gray-200 bg-opacity-20 backdrop-blur-sm border border-gray-300 border-opacity-30 rounded-full flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-30 transition-all duration-300">
                <span className="text-gray-800 font-bold text-sm">f</span>
              </button>
              <button className="w-12 h-12 bg-gray-200 bg-opacity-20 backdrop-blur-sm border border-gray-300 border-opacity-30 rounded-full flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-30 transition-all duration-300">
                <span className="text-gray-800 font-bold text-sm">X</span>
              </button>
              <button className="w-12 h-12 bg-gray-200 bg-opacity-20 backdrop-blur-sm border border-gray-300 border-opacity-30 rounded-full flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-30 transition-all duration-300">
                <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="w-12 h-12 bg-gray-200 bg-opacity-20 backdrop-blur-sm border border-gray-300 border-opacity-30 rounded-full flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-30 transition-all duration-300">
                <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 2.007L10 10.004l7.997-7.997H2.003z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Centered Banner Content */}
        <div className="h-full flex items-center justify-center px-8">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 max-w-3xl text-center shadow-2xl">
            <div className="mb-4">
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                Office
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-800">
              How To Personalize Your Office With Decor For Increased Motivation
            </h1>
            <div className="flex items-center justify-center flex-wrap gap-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>January 2, 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>by Themesflat</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span>12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetailsPage