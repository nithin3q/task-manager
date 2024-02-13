import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  const showToast = () => {
    toast.error('This is a success toast');
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
    </div>
  );
};

export default Toast;
