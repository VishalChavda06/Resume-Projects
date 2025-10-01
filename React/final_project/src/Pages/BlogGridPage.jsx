import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogGridPage = () => {
  // Sample blog data
  const blogData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "Guides",
      date: "January 2, 2025",
      author: "Themesflat",
      title: "Maximizing Comfort with Ergonomic Office Furniture",
      description: "Discover how ergonomic chairs and desks can enhance your comfort and productivity at work."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      category: "Workspace",
      date: "January 3, 2025",
      author: "Themesflat",
      title: "The Best Office Desks for Small Spaces",
      description: "Learn how to choose compact yet functional desks to make the most of your office space."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "Tech",
      date: "January 3, 2025",
      author: "Themesflat",
      title: "How to Create a Stylish and Productive Workspace",
      description: "Tips for balancing aesthetics and functionality when designing your office."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      category: "Guides",
      date: "January 7, 2025",
      author: "Themesflat",
      title: "Choosing the Right Standing Desk for a Healthier Workspace",
      description: "Explore the benefits of standing desks and how they can improve your posture and productivity."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "Workspace",
      date: "January 9, 2025",
      author: "Themesflat",
      title: "Storage Solutions for an Organized Office",
      description: "Find out how proper storage furniture can declutter your workspace and boost focus."
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      category: "Tech",
      date: "January 11, 2025",
      author: "Themesflat",
      title: "Lighting Options to Boost Productivity in Your Office",
      description: "Discover how different lighting choices can affect your work environment and productivity."
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "Guides",
      date: "January 15, 2025",
      author: "Themesflat",
      title: "Creating Collaborative Spaces with Flexible Office Furniture",
      description: "Learn how to design office spaces that encourage teamwork and creativity through versatile furniture."
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      category: "Workspace",
      date: "January 19, 2025",
      author: "Themesflat",
      title: "Budget-Friendly Office Furniture Ideas for Startups",
      description: "Affordable yet functional furniture solutions for new businesses or home offices."
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "Tech",
      date: "January 25, 2025",
      author: "Themesflat",
      title: "How to Personalize Your Office with Decor for Increased Motivation",
      description: "Tips for selecting decor that not only reflects your style but also keeps you inspired throughout the day."
    }
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogData.length / itemsPerPage);

  // Get current items for pagination
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return blogData.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-[url('https://gearo-html.vercel.app/images/page-title/page-title-1.jpg')] bg-cover bg-center h-[250px] text-white py-12">
        <div className="max-w-[1400px] mx-auto px-8">
          <h1 className="text-4xl font-semibold mb-2 animate-bounce-in">Blog Grid</h1>
          <div className="text-base text-white animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link to="/" className="hover:underline transition-all duration-300 hover:text-blue-200">
              Homepage
            </Link>{" "}
            <span>&gt;</span> <span>Page</span> <span>&gt;</span>{" "}
            <span>Blog Grid</span>
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {getCurrentItems().map((blog) => (
            <article key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{blog.date}</span>
                  <span className="mx-2">•</span>
                  <span>by {blog.author}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {blog.description}
                </p>

                {/* Read More Button */}
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-300 hover:underline">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white border border-blue-600'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>

        {/* Page Info */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Page {currentPage} of {totalPages} • Showing {getCurrentItems().length} of {blogData.length} articles
        </div>
      </div>
    </>
  )
}

export default BlogGridPage