import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';
import { FaHeart, FaShoppingCart, FaStar, FaArrowLeft } from 'react-icons/fa';

const ProductPage = ({ onBack, productId }) => {
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  
  const isInWishlist = wishlistItems.some(item => item.id === selectedProduct?.id);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(selectedProduct.id));
    } else {
      dispatch(addToWishlist(selectedProduct));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <FaArrowLeft />
        <span>Back to Products</span>
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="max-w-md h-96 object-contain"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {selectedProduct.title}
            </h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(selectedProduct.rating?.rate || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                ({selectedProduct.rating?.rate || 0} stars, {selectedProduct.rating?.count || 0} reviews)
              </span>
            </div>
            <p className="text-green-600 font-bold text-2xl">
              ${selectedProduct.price}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
            
            <button
              onClick={handleWishlistToggle}
              className={`px-6 py-3 rounded-md transition-colors flex items-center space-x-2 ${
                isInWishlist
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaHeart />
              <span>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 