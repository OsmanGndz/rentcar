"use client"

import React, { ReactNode } from "react";

type CarTypeButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  selected: boolean;
};

const CarTypeButton: React.FC<CarTypeButtonProps> = ({
  children,
  onClick,
  className,
  selected
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[148px] h-[50px] flex flex-row items-center justify-center gap-2  rounded-full cursor-pointer hover:scale-104 transition duration-500 ${className} ${selected ? "bg-violet-800 text-white": "bg-gray-100"}`}
    >
      {children}
    </button>
  );
};

export default CarTypeButton;
