import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'

const TopHeadline = () => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const languageRef = useRef(null)
  const currencyRef = useRef(null)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Vietnam', flag: '🇻🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' }
  ]

  const currencies = [
    { code: 'USD', name: 'USD', flag: '🇺🇸', country: 'United States' },
    { code: 'VND', name: 'VND', flag: '🇻🇳', country: 'Vietnam' },
    { code: 'EUR', name: 'EUR', flag: '🇪🇺', country: 'Europe' },
    { code: 'GBP', name: 'GBP', flag: '🇬🇧', country: 'United Kingdom' }
  ]

  const promotionalMessages = [
    {
      text: "Free shipping on all orders over",
      highlight: "$20.00"
    },
    {
      text: "Get 20% off on your first order",
      highlight: "SAVE20"
    },
    {
      text: "New customers get",
      highlight: "FREE DELIVERY"
    }
  ]

  // Rotate messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % promotionalMessages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguageDropdown(false)
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setShowCurrencyDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

  const handlePreviousMessage = () => {
    setCurrentMessageIndex((prev) =>
      prev === 0 ? promotionalMessages.length - 1 : prev - 1
    )
  }

  const handleNextMessage = () => {
    setCurrentMessageIndex((prev) => (prev + 1) % promotionalMessages.length)
  }

  return (
    <div className="bg-gray-800 text-white px-10 py-2 flex items-center justify-between relative">
      {/* Left side - Language and Currency dropdowns */}
      <div className="flex items-center space-x-4">
        {/* Language Dropdown */}
        <div className="relative" ref={languageRef}>
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => {
              setShowLanguageDropdown(!showLanguageDropdown)
              setShowCurrencyDropdown(false)
            }}
          >
            <span>{selectedLanguage.name}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {showLanguageDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-lg z-50 min-w-[120px]">
              {languages.map((language) => (
                <div
                  key={language.code}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  onClick={() => {
                    setSelectedLanguage(language)
                    setShowLanguageDropdown(false)
                  }}
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Currency Dropdown */}
        <div className="relative" ref={currencyRef}>
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => {
              setShowCurrencyDropdown(!showCurrencyDropdown)
              setShowLanguageDropdown(false)
            }}
          >
            <span className="text-sm">{selectedCurrency.flag}</span>
            <span>{selectedCurrency.code}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {showCurrencyDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-lg z-50 min-w-[150px]">
              {currencies.map((currency) => (
                <div
                  key={currency.code}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  onClick={() => {
                    setSelectedCurrency(currency)
                    setShowCurrencyDropdown(false)
                  }}
                >
                  <span>{currency.flag}</span>
                  <span>{currency.code}</span>
                  <span className="text-xs text-gray-500">({currency.country})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center - Rotating promotional message with navigation buttons */}
      <div className="flex items-center space-x-4">
        <button
          className="text-white hover:text-gray-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-700"
          onClick={handlePreviousMessage}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm min-w-[300px] text-center">
          {promotionalMessages[currentMessageIndex].text} <span className="text-gray-300">{promotionalMessages[currentMessageIndex].highlight}</span>
        </span>
        <button
          className="text-white hover:text-gray-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-700"
          onClick={handleNextMessage}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Right side - Navigation links */}
      <div className="flex items-center space-x-6">
        <Link to='about' className="text-sm hover:text-gray-300">About</Link>
        <Link to="contact" className="text-sm hover:text-gray-300">Contact</Link>
        <Link to="location" className="text-sm hover:text-gray-300">Location</Link>
      </div>
    </div>
  )
}

export default TopHeadline
