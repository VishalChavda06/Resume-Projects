import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from './notificationSlice.jsx';

const Notification = () => {
  const dispatch = useDispatch();
  const { message, visible } = useSelector((state) => state.notification);

  if (!visible) return null;

  return (
    <div className="fixed top-8 right-8 bg-gray-800 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-fade-in">
      <span>{message}</span>
    
    </div>
  );
};

export default Notification; 