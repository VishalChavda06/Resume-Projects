import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/BlogListPage.css";

const BlogListPage = () => {
  // Sample blog data - you can replace this with your actual data
  const allBlogPosts = [
    {
      id: 1,
      image: "https://gearo-html.vercel.app/images/blog/blog-1.jpg",
      category: "Guides",
      date: "January 2, 2025",
      author: "by Themesflat",
      title: "Maximizing Comfort with Ergonomic Office Furniture",
      description: "Discover how ergonomic chairs and desks can enhance your comfort and productivity at work. Learn about the latest innovations in office furniture design."
    },
    {
      id: 2,
      image: "https://gearo-html.vercel.app/images/blog/blog-2.jpg",
      category: "WorkSpace",
      date: "January 2, 2025",
      author: "by Themesflat",
      title: "Creating the Perfect Modern Workspace Environment",
      description: "Transform your office into a productive and inspiring workspace with modern design principles and innovative furniture solutions."
    },
    {
      id: 3,
      image: "https://gearo-html.vercel.app/images/blog/blog-3.jpg",
      category: "Tech",
      date: "January 2, 2025",
      author: "by Themesflat",
      title: "Latest Technology Trends in Modern Office Design",
      description: "Stay ahead of the curve with the latest technology trends that are revolutionizing office design and workplace productivity."
    },
    {
      id: 4,
      image: "https://gearo-html.vercel.app/images/blog/blog-4.jpg",
      category: "Guides",
      date: "January 2, 2025",
      author: "by Themesflat",
      title: "Essential Office Organization Tips for Maximum Efficiency",
      description: "Master the art of office organization with proven strategies that will boost your productivity and create a more enjoyable work environment."
    },
    {
      id: 5,
      image: "https://gearo-html.vercel.app/images/blog/blog-9.jpg",
      category: "Tech",
      date: "January 2, 2025",
      author: "by Themesflat",
      title: "Smart Office Solutions for the Digital Age",
      description: "Embrace the future of work with smart office solutions that integrate technology seamlessly into your daily workflow."
    },
    // Additional posts for pagination demo
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Design",
      date: "January 3, 2025",
      author: "by Themesflat",
      title: "Modern Office Design Principles for 2025",
      description: "Explore the latest design principles that are shaping modern office spaces and creating more productive work environments."
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Productivity",
      date: "January 4, 2025",
      author: "by Themesflat",
      title: "Boosting Productivity Through Office Layout Optimization",
      description: "Learn how strategic office layout design can significantly improve team productivity and collaboration."
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Sustainability",
      date: "January 5, 2025",
      author: "by Themesflat",
      title: "Sustainable Office Furniture: Eco-Friendly Choices",
      description: "Discover sustainable office furniture options that are good for the environment and your workplace."
    }
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const totalPosts = allBlogPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Calculate current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allBlogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Pagination functions
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Show first 3 pages + ellipsis + last page
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 3 pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show first page + ellipsis + current page + ellipsis + last page
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="h-[250px] bg-[url('https://gearo-html.vercel.app/images/page-title/page-title-1.jpg')] text-white bg-fixed py-12">
        <div className="max-w-[1400px] mx-auto px-8">
          <h1 className="text-4xl font-semibold mb-2">Blog List</h1>
          <div className="text-base text-white">
            <Link to="/" className="hover:underline">
              Homepage
            </Link>{" "}
            <span>&gt;</span> <span>Page</span> <span>&gt;</span>{" "}
            <span>Blog List</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="flex gap-12">
          {/* Left Column - Blog Posts */}
          <div className="flex-1 space-y-8">
            {/* Dynamic Blog Posts */}
            {currentPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="flex">
                  <div className="w-80 h-64 flex-shrink-0 relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-8 flex-1">
                    <p className="text-sm text-gray-500 mb-3">{post.date} | {post.author}</p>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                      <Link to="#" className="hover:text-blue-600 transition-colors duration-200">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {post.description}
                    </p>
                    <Link to="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                      Read More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {/* Functional Pagination Section */}
            <div className="mt-12">
              {/* Page Info */}
              <div className="text-center text-gray-500 text-sm mb-6">
                <p>Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, totalPosts)} of {totalPosts} posts</p>
              </div>
              
              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-2">
                {/* Previous Button */}
                <button 
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 hover:bg-gray-50 rounded-lg ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNumber, index) => (
                    <button
                      key={index}
                      onClick={() => typeof pageNumber === 'number' ? goToPage(pageNumber) : null}
                      disabled={pageNumber === '...'}
                      className={`w-10 h-10 rounded-lg transition-colors duration-200 ${
                        pageNumber === currentPage
                          ? 'bg-blue-600 text-white font-medium hover:bg-blue-700'
                          : pageNumber === '...'
                          ? 'text-gray-500 cursor-default'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
                
                {/* Next Button */}
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 hover:bg-gray-50 rounded-lg ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-96 space-y-8">
            {/* Search Input */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your email address"
                  className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

           

            {/* Related Post */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <h3 className="text-xl font-bold text-gray-800 p-6 pb-4">Related Post</h3>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Storage Solutions for an Organized Office"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  Tech
                </span>
              </div>
              <div className="p-6 pt-4">
                <p className="text-sm text-gray-500 mb-2">January 9, 2025 | by Themesflat</p>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 leading-tight">
                  Storage Solutions for an Organized Office
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Discover innovative storage solutions that can transform your cluttered workspace into an organized, productive environment.
                </p>
              </div>
            </div>

            {/* Guides Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Guides</h3>
              
              {/* First Guide */}
              <div className="flex gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Office Furniture Selection"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <span className="absolute top-1 left-1 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                    Guides
                  </span>
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
                    How to Choose the Perfect Office Furniture for...
                  </h5>
                  <p className="text-xs text-gray-500">March 02, 2025 | by Themesflat</p>
                </div>
              </div>

              {/* Second Guide */}
              <div className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Small Office Space Optimization"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <span className="absolute top-1 left-1 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                    Guides
                  </span>
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
                    Maximizing Small Office Spaces with Smart...
                  </h5>
                  <p className="text-xs text-gray-500">March 01, 2025 | by Themesflat</p>
                </div>
              </div>
              
            </div>
             {/* Categories Section */}
             <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-3">
                <Link to="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 py-1">
                  Office Trending
                </Link>
                <Link to="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 py-1">
                  Ergonomic Solutions
                </Link>
                <Link to="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 py-1">
                  Workspace Organization
                </Link>
                <Link to="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 py-1">
                  Productivity Tips
                </Link>
                <Link to="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 py-1">
                  Buyer's Guides
                </Link>
              </div>
            </div>

            {/* Popular Tag Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Tag</h3>
              <div className="flex flex-wrap gap-2">
                <Link to="#" className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm">
                  Ergonomic
                </Link>
                <Link to="#" className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm">
                  Desk Setup
                </Link>
                <Link to="#" className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm">
                  Office Furniture
                </Link>
                <Link to="#" className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm">
                  Workspace
                </Link>
                <Link to="#" className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm">
                  Accessories
                </Link>
                <Link to="#" className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm">
                  Office Decor
                </Link>
                <Link to="#" className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm">
                  Wireless Keyboards
                </Link>
                <Link to="#" className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm">
                  Monitor Stands
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
