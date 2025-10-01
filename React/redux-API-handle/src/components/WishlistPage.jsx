import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { FaHeart, FaTrash, FaShoppingCart, FaEye } from 'react-icons/fa';

const WishlistPage = ({ onViewProduct }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500">Add some products to your wishlist!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        <button
          onClick={handleClearWishlist}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Clear Wishlist
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain p-4"
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-green-600 font-bold text-lg mb-3">
                ${product.price}
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => onViewProduct(product.id)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaEye size={14} />
                  <span>View</span>
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart size={14} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage; 