import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ShoppingCart from "./ShoppingCart";
import "../styles/Navbar.css";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const { getCartItemCount, isOpen: isCartOpen, openCart, closeCart } = useCart();
  const { getWishlistCount } = useWishlist();

  const navigationItems = [
    {
      label: "SHOP",
      hasDropdown: true,
      dropdownItems: [
        { label: "Shop Default", link: "/shop-default" },
        { label: "Shop List", link: "/shop-list" },
        { label: "Wishlist", link: "/wishlist" },
        { label: "Shop Checkout", link: "/shop-checkout" },
      ]
    },
    {
      label: "BLOGS",
      hasDropdown: true,
      dropdownItems: [
        { label: "Blog Grid", link: "/blog-grid" },
        { label: "Blog List", link: "/blog-list" },
        { label: "Blog Details", link: "/blog-details" },
      ]
    },
    {
      label: "PAGES",
      hasDropdown: true,
      dropdownItems: [
        { label: "About Us", link: "/about" },
        { label: "Contact", link: "/contact" },
        { label: "FAQ", link: "/faq" },
        { label: "Location", link: "/location" }
      ]
    },
  ];

  const handleMouseEnter = (label) => {
    setActiveDropdown(label);
    setHoveredLink(label);
    setIsDropdownHovered(true);
    
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsDropdownHovered(false);
    dropdownTimeoutRef.current = setTimeout(() => {
      if (!isDropdownHovered) {
        setActiveDropdown(null);
        setHoveredLink(null);
      }
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    setIsDropdownHovered(true);
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownHovered(false);
    dropdownTimeoutRef.current = setTimeout(() => {
      if (!isDropdownHovered) {
        setActiveDropdown(null);
        setHoveredLink(null);
      }
    }, 200);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setHoveredLink(null);
  };

  const toggleCart = () => {
    if (isCartOpen) {
      closeCart();
    } else {
      openCart();
    }
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 relative">
            {/* Left Section - Navigation */}
            <div className="flex-1">
              <ul className="flex space-x-8">
                {navigationItems.map((item) => (
                  <li key={item.label} className="relative">
                    {item.hasDropdown ? (
                      <div
                        className="nav-link cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm uppercase tracking-wide"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <span className="flex items-center gap-1">
                          {item.label}
                          <svg 
                            className={`chevron-rotate transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>

                        {/* Dropdown Menu */}
                        {item.hasDropdown && activeDropdown === item.label && (
                          <div 
                            ref={dropdownRef}
                            className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100/50 opacity-0 animate-in slide-in-from-top-2 duration-300 z-50 overflow-hidden"
                            onMouseEnter={handleDropdownMouseEnter}
                            onMouseLeave={handleDropdownMouseLeave}
                          >
                            <div className="py-3">
                              {item.dropdownItems.map((dropdownItem, index) => (
                                <Link
                                  key={dropdownItem.label}
                                  to={dropdownItem.link}
                                  className="block px-5 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 relative group/item mx-2 rounded-lg"
                                  style={{
                                    animationDelay: `${index * 75}ms`
                                  }}
                                  onClick={handleLinkClick}
                                >
                                  <span className="relative z-10">{dropdownItem.label}</span>
                                  <div className="absolute inset-0 bg-blue-50/0 group-hover/item:bg-blue-50/80 rounded-lg transition-all duration-300 transform scale-x-0 group-hover/item:scale-x-100 origin-left"></div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.link}
                        className="nav-link text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm uppercase tracking-wide"
                        onClick={handleLinkClick}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Center Section - Brand Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/">
                <img
                  src="https://gearonextjs.vercel.app/images/logo/logo.svg"
                  alt="GearO Logo"
                  className="h-8"
                />
              </Link>
            </div>

            {/* Right Section - Utility Icons */}
            <div className="flex-1 flex justify-end">
              <ul className="flex gap-6">
                <li className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200 hover:scale-110">
                  <CiSearch />
                </li>
                <li className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200 hover:scale-110">
                  <Link to="/login">
                    <CiUser />
                  </Link>
                </li>
                <li className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200 hover:scale-110 relative">
                  <Link to="/wishlist">
                    <CiHeart />
                  </Link>
                  {getWishlistCount() > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                      {getWishlistCount()}
                    </div>
                  )}
                </li>
                <li className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200 hover:scale-110 relative">
                  <CiShoppingCart onClick={toggleCart} />
                  {getCartItemCount() > 0 && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                      {getCartItemCount()}
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Cart */}
      <ShoppingCart />
    </>
  );
};

export default Navbar;
