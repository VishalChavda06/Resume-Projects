import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styles/ImageBanner.css'

const ImageBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Ergonomic Chair Pro",
      subtitle: "Get superior support and better posture with ergonomic chairs for long work hours.",
      buttonText: "Add To Cart",
      price: 59.99,
      selectedColor: 0,
      colors: ['#f5f5f5', '#d3d3d3']
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Wireless Charging Dock",
      subtitle: "Get superior support and better posture with ergonomic chairs for long work hours.",
      buttonText: "Add To Cart",
      price: 59.99,
      selectedColor: 0,
      colors: ['#000000', '#808080']
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Premium Office Solutions",
      subtitle: "Transform your workspace with our premium office furniture collection.",
      buttonText: "Add To Cart",
      price: 59.99,
      selectedColor: 0,
      colors: ['#d2b48c', '#ffc0cb']
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Smart Home Office",
      subtitle: "Create the perfect work environment with our smart office solutions.",
      buttonText: "Add To Cart",
      price: 59.99,
      selectedColor: 0,
      colors: ['#87ceeb', '#f5f5f5']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleAddToCart = (banner) => {
    addToCart(banner);
    console.log(`${banner.title} added to cart!`);
  };

  const handleAddToWishlist = (banner) => {
    addToWishlist(banner);
    console.log(`${banner.title} added to wishlist!`);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentSlide]);

  return (
    <div className="banner-container">
      <div className="banner-carousel">
        <div className="banner-slides-container">
          <div
            className="banner-slides"
            style={{ 
              transform: `translateX(-${currentSlide * 33.33}%)`,
              transition: 'transform 0.6s ease-in-out'
            }}
          >
            {banners.map((banner, index) => (
              <div key={banner.id} className="banner-slide">
                <div className="banner-image-container">
                  <img 
                    src={banner.image} 
                    alt={banner.title} 
                    className="banner-image"
                    loading="eager"
                  />
                  <div className="banner-overlay">
                    <div className="banner-content">
                      <h2 className="banner-title">{banner.title}</h2>
                      <p className="banner-subtitle">{banner.subtitle}</p>
                      <div className="banner-price">${banner.price}</div>
                      <div className="banner-buttons">
                        <button 
                          className="banner-button"
                          onClick={() => handleAddToCart(banner)}
                        >
                          {banner.buttonText}
                          <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button 
                          className="banner-wishlist-button"
                          onClick={() => handleAddToWishlist(banner)}
                          title="Add to wishlist"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button className="nav-button nav-prev" onClick={prevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button className="nav-button nav-next" onClick={nextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="pagination-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;