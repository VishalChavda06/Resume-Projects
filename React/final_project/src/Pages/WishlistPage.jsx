import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiHeart, CiShoppingCart, CiTrash } from 'react-icons/ci';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { items: wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      price: product.salePrice || product.originalPrice,
      selectedColor: product.colors[0] // Default to first color
    });
  };

  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="h-[250px] text-white py-12 bg-[url('https://gearo-html.vercel.app/images/page-title/page-title-10.jpg')] bg-fixed bg-cover bg-center">
          <div className="max-w-[1100px] mx-auto px-8">
            <h1 className="text-4xl font-semibold mb-2">My Wishlist</h1>
            <div className="text-base text-white">
              <Link to="/" className="hover:underline">
                Homepage
              </Link>{" "}
              <span>&gt;</span> <span>Wishlist</span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-[1100px] mx-auto px-8 py-20 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <CiHeart className="text-4xl text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start adding products to your wishlist by browsing our collection and clicking the heart icon.
          </p>
          <Link
            to="/shop-list"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="h-[250px] text-white py-12 bg-[url('https://gearo-html.vercel.app/images/page-title/page-title-10.jpg')] bg-fixed bg-cover bg-center">
        <div className="max-w-[1100px] mx-auto px-8">
          <h1 className="text-4xl font-semibold mb-2">My Wishlist</h1>
          <div className="text-base text-white">
            <Link to="/" className="hover:underline">
              Homepage
            </Link>{" "}
            <span>&gt;</span> <span>Wishlist</span>
          </div>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="max-w-[1100px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Wishlist ({wishlistItems.length} items)
            </h2>
            <p className="text-gray-600 mt-1">
              Save your favorite products for later
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <CiTrash className="text-lg" />
            Clear All
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((product) => (
            <div key={product.id} className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={hoveredProduct === product.id ? product.hoverImage : product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-opacity duration-300"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                />
                {product.isOnSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {product.discount}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleRemoveFromWishlist(product)}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <CiTrash className="text-red-500" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-blue-600">
                    ${product.salePrice || product.originalPrice}
                  </span>
                  {product.isOnSale && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Color Options */}
                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-700 mb-2 block">Color:</span>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <CiShoppingCart />
                    Add To Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(product)}
                    className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link
            to="/shop-list"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;





