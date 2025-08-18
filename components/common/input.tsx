"use client";

import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const CustomInput: React.FC<inputProps> = ({ type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    return (
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          {...props}
          className={`w-full px-4 py-3 bg-gray-100 rounded-lg pr-10`}
        />
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      </div>
    );
  }

  return (
    <input
      type={type}
      {...props}
      className={`w-full px-4 py-3 bg-gray-100 rounded-lg`}
    />
  );
};

export default CustomInput;
