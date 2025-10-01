import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import { showNotification, hideNotification } from "./notificationSlice.jsx";
import Notification from "./Notification.jsx";

function App() {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(showNotification("Add to Cart successfully Product"));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 2000);
  };

  return (
    <>
      <Notification />
      <h1 className="text-3xl m-3 text-center mt-3">
        Redux-Notification in React
      </h1>
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-8">
        <img
          className="w-full h-48 object-contain"
          src="https://m.media-amazon.com/images/I/313KXomNU9L._SX300_SY300_QL70_FMwebp_.jpg"
          alt="Product"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">Sample Product</h2>
          <p className="text-gray-700 mb-2">
            This is a sample product description.
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-blue-600">$19.99</span>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit in
              deleniti natus, provident ipsam asperiores, veniam autem quas,
              omnis officiis nam esse soluta consequatur? Perferendis nisi
              quaerat in voluptatem culpa.
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
