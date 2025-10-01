import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiHeart, CiShoppingCart, CiShare2, CiStar } from 'react-icons/ci';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [showZoom, setShowZoom] = useState(false);

  // Mock product data - in real app this would come from API
  const product = {
    id: productId || 1,
    name: "Ergonomic Chair Pro",
    originalPrice: 98.99,
    salePrice: 79.99,
    discount: 25,
    rating: 4.5,
    reviews: 134,
    soldCount: 18,
    soldTime: "32 hours",
    isBestSeller: true,
    description: "The garments labelled as Committed are products that have been produced using sustainable fibres or processes, reducing their environmental impact.",
    viewingCount: 28,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop"
    ],
    colors: [
      { name: "Light Pink", hex: "#FFB6C1" },
      { name: "Gray", hex: "#808080" },
      { name: "Dark Gray", hex: "#696969" }
    ],
    sizes: [
      { id: 0, name: "Size A - Small", description: "Best for users 5'0\" - 5'6\"" },
      { id: 1, name: "Size B - Medium", description: "Best for users 5'6\" - 6'0\"" },
      { id: 2, name: "Size C - Large", description: "Best for users 6'0\" - 6'6\"" }
    ],
    category: "Chair",
    features: [
      "Ergonomic design for optimal posture",
      "Adjustable armrests and lumbar support",
      "Breathable mesh back",
      "Weight capacity: 300 lbs",
      "5-year warranty"
    ],
    specifications: {
      "Seat Height": "18-22 inches",
      "Seat Width": "20 inches",
      "Seat Depth": "19 inches",
      "Back Height": "28 inches",
      "Weight": "45 lbs",
      "Material": "Mesh, Aluminum, Steel"
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor: product.colors[selectedColor],
      selectedSize: product.sizes[selectedSize],
      quantity: quantity
    });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleImageHover = (index) => {
    setHoveredImage(index);
    setSelectedImage(index);
  };

  const handleMouseMove = (e) => {
    if (!showZoom) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    e.currentTarget.style.setProperty('--x', `${xPercent}%`);
    e.currentTarget.style.setProperty('--y', `${yPercent}%`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Homepage
          </Link>
          <span>&gt;</span>
          <Link to={`/${product.category.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
            {product.category}
          </Link>
          <span>&gt;</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-6">
            {/* Main Image with Zoom */}
            <div className="relative">
              <div className="text-center mb-2">
                <span className="text-sm text-gray-500">
                  🔍 Hover over image to zoom
                </span>
              </div>
              <div
                className="relative overflow-hidden rounded-lg cursor-zoom-in border border-gray-200 hover:border-gray-300 transition-all duration-200"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
                style={{
                  '--x': '50%',
                  '--y': '50%'
                }}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-auto transition-all duration-200 ease-out"
                  style={{
                    transform: showZoom ? `scale(${zoomLevel})` : 'scale(1)',
                    transformOrigin: 'var(--x) var(--y)'
                  }}
                />
                

              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  onMouseEnter={() => handleImageHover(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index 
                      ? 'border-blue-500 scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                {product.isBestSeller && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                    Best Seller
                  </span>
                )}
                <div className="flex items-center space-x-1">
                  <CiStar className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <span>{product.soldCount} sold in last {product.soldTime}</span>
                <span>•</span>
                <span>{product.viewingCount} people are viewing this right now</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">${product.salePrice}</span>
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full font-medium">
                -{product.discount}%
              </span>
            </div>

            {/* Description */}
            <div className="text-gray-700 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900">Colors: {product.colors[selectedColor].name}</span>
              </div>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === index 
                        ? 'border-blue-500 scale-110' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900">Size: {product.sizes[selectedSize].name}</span>
                <Link to="#" className="text-sm text-blue-600 hover:underline">
                  Find Your Size
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`px-4 py-3 text-sm rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedSize === size.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">{size.name.split(' - ')[1]}</div>
                    <div className="text-xs text-gray-500">{size.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-sm font-medium text-gray-900 block mb-3">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 h-10 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max="99"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <CiShoppingCart className="w-5 h-5" />
                  <span>Add to cart - ${product.salePrice}</span>
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
                  title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <CiHeart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
                <button className="w-14 h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors" title="Share">
                  <CiShare2 className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              <button className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                Buy it now
              </button>
            </div>
          </div>
        </div>

        {/* Product Features & Specifications */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Product Features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h3>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">{key}</span>
                  <span className="text-gray-900 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

