import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiFilter, CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useWishlist } from '../context/WishlistContext';

const ShopDefaultPage = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [gridView, setGridView] = useState(4); // 2, 3, or 4 columns
  const [sortBy, setSortBy] = useState('best-selling');
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product);
    } else {
      addToWishlist(product);
    }
  };

  // Mock product data with working placeholder images
  const products = [
    {
      id: 1,
      name: "Ergonomic Chair Pro",
      originalPrice: 98.00,
      salePrice: 79.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      colors: ["#D3D3D3", "#FFFFFF"],
      isOnSale: true,
      discount: "-18%",
      category: "Chairs",
      size: "Free Size"
    },
    {
      id: 2,
      name: "Open Box - Adjustable Laptop Stand",
      originalPrice: 98.00,
      salePrice: 69.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      colors: ["#FFFFFF", "#D3D3D3"],
      isOnSale: true,
      discount: "-25%",
      category: "Accessories",
      size: "M"
    },
    {
      id: 3,
      name: "Laptop Stand",
      originalPrice: 98.00,
      salePrice: 69.99,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      colors: ["#228B22", "#D2691E"],
      isOnSale: true,
      discount: "-25%",
      category: "Accessories",
      size: "L"
    },
    {
      id: 4,
      name: "Double Standing Desk",
      originalPrice: 98.00,
      salePrice: 79.99,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop",
      colors: ["#D2691E", "#FFB6C1", "#808080"],
      isOnSale: false,
      category: "Desks",
      size: "Free Size"
    },
    {
      id: 5,
      name: "Wireless Charging Dock",
      originalPrice: 98.00,
      salePrice: 69.99,
      image: "https://images.unsplash.com/photo-1609592806598-ef25b0bbf0c9?w=400&h=400&fit=crop",
      colors: ["#000000"],
      isOnSale: true,
      discount: "-25%",
      category: "Electronics",
      size: "S"
    },
    {
      id: 6,
      name: "Ergonomic Headrest",
      originalPrice: 98.00,
      salePrice: 79.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      colors: ["#87CEEB"],
      isOnSale: false,
      category: "Chairs",
      size: "Free Size"
    },
    {
      id: 7,
      name: "Hybrid Laptop Sleeve",
      originalPrice: 98.00,
      salePrice: 69.99,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      colors: ["#D2691E"],
      isOnSale: true,
      discount: "-25%",
      category: "Accessories",
      size: "M"
    },
    {
      id: 8,
      name: "Wireless Charging Tray",
      originalPrice: 98.00,
      salePrice: 79.99,
      image: "https://images.unsplash.com/photo-1609592806598-ef25b0bbf0c9?w=400&h=400&fit=crop",
      colors: ["#000000"],
      isOnSale: false,
      category: "Electronics",
      size: "L"
    }
  ];

  // Categories with counts
  const categories = [
    { name: "Chairs", count: 45 },
    { name: "Desks", count: 32 },
    { name: "Accessories", count: 112 },
    { name: "Electronics", count: 78 },
    { name: "Lighting", count: 23 },
    { name: "Storage", count: 56 },
    { name: "Uncategorized", count: 14 }
  ];

  // Sizes
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "Free Size"];

  // Filter products based on all criteria
  const filteredProducts = products.filter(product => {
    // Sale filter
    if (showSaleOnly && !product.isOnSale) return false;
    
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    
    // Size filter
    if (selectedSizes.length > 0 && !selectedSizes.includes(product.size)) return false;
    
    // Price filter
    if (product.salePrice < priceRange[0] || product.salePrice > priceRange[1]) return false;
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.salePrice - b.salePrice;
      case 'price-high-low':
        return b.salePrice - a.salePrice;
      case 'name-a-z':
        return a.name.localeCompare(b.name);
      case 'name-z-a':
        return b.name.localeCompare(a.name);
      default:
        return 0; // best-selling (default order)
    }
  });

  // Pagination
  const productsPerPage = 8;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const getGridClasses = () => {
    switch (gridView) {
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      default:
        return "grid-cols-4";
    }
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceRange([0, 500]);
    setShowSaleOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="h-[250px] text-white py-12 bg-[url('https://gearo-html.vercel.app/images/page-title/page-title-9.jpg')] bg-fixed bg-cover bg-center">
        <div className="max-w-[1100px] mx-auto px-8">
          <h1 className="text-4xl font-semibold mb-2">Shop Default</h1>
          <div className="text-base text-white">
            <Link to="/" className="hover:underline">
              Homepage
            </Link>{" "}
            <span>&gt;</span> <span>Shop Default</span>
          </div>
        </div>
      </div>

      {/* Shop Content */}
      <div className="max-w-[1100px] mx-auto px-8 py-12">
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          {/* Left Side - Filters */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <CiFilter className="text-lg" />
              Filters
            </button>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showSaleOnly}
                onChange={(e) => setShowSaleOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Shop sale items only</span>
            </label>
          </div>

          {/* Center - Grid View Options */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGridView(2)}
              className={`p-2 rounded-lg transition-colors ${
                gridView === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </button>
            <button
              onClick={() => setGridView(3)}
              className={`p-2 rounded-lg transition-colors ${
                gridView === 3 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM12 9a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-4z" />
              </svg>
            </button>
            <button
              onClick={() => setGridView(4)}
              className={`p-2 rounded-lg transition-colors ${
                gridView === 4 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM12 9a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-4zM3 16a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM12 16a1 1 0 00-1 1v2a1 1 0 001 1h4a1 1 0 001-1v-2a1 1 0 00-1-1h-4z" />
              </svg>
            </button>
          </div>

          {/* Right Side - Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="best-selling">Best Selling</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid ${getGridClasses()} gap-6 mb-8`}>
          {currentProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 relative">
              {/* Action Buttons - Outside Link to prevent conflicts */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <button 
                  onClick={() => handleWishlistToggle(product)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                    isInWishlist(product.id) 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <CiHeart className={`${isInWishlist(product.id) ? 'text-white' : 'text-gray-600'}`} />
                </button>
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <Link to={`/product/${product.id}`} className="block">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isOnSale && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {product.discount}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-semibold text-blue-600">${product.salePrice}</span>
                    {product.isOnSale && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* Color Options */}
                  <div className="flex gap-2 mb-4">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <CiShoppingCart />
                    Add To Cart
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                &gt;
              </button>
            )}
          </div>
        )}
      </div>

      {/* Filter Sidebar - Fixed positioning on the left */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
          {/* Sidebar - Positioned on the left */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-500 ease-out pointer-events-auto" style={{animation: 'slideInLeft 0.5s ease-out'}}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                  <CiFilter className="text-lg" />
                  <span className="font-medium text-gray-900">Filters</span>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Product Categories */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Product Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.name} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.name)}
                            onChange={() => handleCategoryToggle(category.name)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">({category.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Price</h3>
                  <div className="space-y-4">
                    <div className="px-2">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Min price</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0"
                          />
                          <span className="absolute right-3 top-2 text-gray-500">$</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Max price</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="500"
                          />
                          <span className="absolute right-3 top-2 text-gray-500">$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Size</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-2 text-sm rounded-full border transition-colors ${
                          selectedSizes.includes(size)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={clearAllFilters}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-full hover:bg-gray-200 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopDefaultPage;