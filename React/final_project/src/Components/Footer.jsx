import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover
} from "react-icons/fa";
import { TbBrandPaypal } from "react-icons/tb";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FiPackage, FiRotateCcw, FiLifeBuoy, FiPercent } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Top Benefits Section */}
      <div className="bg-white text-black py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* Item 1 */}
          <div>
            <FiPackage size={40} className="mx-auto" />
            <h3 className="mt-4 font-medium text-lg">Free & fast delivery</h3>
            <p className="text-gray-500 text-sm">
              No extra costs, just the price you see.
            </p>
          </div>
          {/* Item 2 */}
          <div>
            <FiRotateCcw size={40} className="mx-auto" />
            <h3 className="mt-4 font-medium text-lg">14-Day Returns</h3>
            <p className="text-gray-500 text-sm">
              Risk-free shopping with easy returns.
            </p>
          </div>
          {/* Item 3 */}
          <div>
            <FiLifeBuoy size={40} className="mx-auto" />
            <h3 className="mt-4 font-medium text-lg">24/7 Support</h3>
            <p className="text-gray-500 text-sm">
              24/7 support, always here just for you.
            </p>
          </div>
          {/* Item 4 */}
          <div>
            <FiPercent size={40} className="mx-auto" />
            <h3 className="mt-4 font-medium text-lg">Member Discounts</h3>
            <p className="text-gray-500 text-sm">
              Special prices for our loyal customers.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700">
        {/* Info & Links */}
        <div>
          <h3 className="font-semibold mb-4">Information</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>About Us</li>
            <li>Our Stories</li>
            <li>Size Guide</li>
            <li>Contact Us</li>
          </ul>
          <div className="mt-6">
            <p className="text-lg font-light">+61 (9) 567 8765 43</p>
            <p className="text-lg font-light">hello@yourname.com</p>
          </div>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="font-semibold mb-4">Customer Services</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Shipping</li>
            <li>Return & Refund</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-2xl mb-4 leading-snug">
            Stay In The Loop With <br /> Weekly Newsletters
          </h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your e-mail"
              className="px-4 py-2 rounded-l-md bg-[#2a2a2a] text-white w-full outline-none"
            />
            <button className="bg-white text-black px-4 py-2 rounded-r-md font-medium">
              Subscribe ↗
            </button>
          </div>
          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-xl">
            <FaFacebookF className="hover:text-gray-400 cursor-pointer" />
            <FaTwitter  className="hover:text-gray-400 cursor-pointer" />
            <FaInstagram className="hover:text-gray-400 cursor-pointer" />
            <FaTelegramPlane className="hover:text-gray-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>Copyright ©2025 GearO. All Rights Reserved.</p>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <FaCcVisa size={34} />
          <FaCcMastercard size={34} />
          <FaCcAmex size={34} />
          <TbBrandPaypal size={34} />
          <FaCcDiscover size={34} />
        </div>
        <div className="mt-4 md:mt-0">
          <MdOutlineKeyboardArrowUp
            size={28}
            className="cursor-pointer hover:text-white"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
