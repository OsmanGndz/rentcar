import React from "react";
import Link from "next/link";

interface CustomButtonProps {
  color?: string; // opsiyonel, default renk atanabilir
  url: string;
  className?: string; // ek Tailwind sınıfları eklemek için
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  color = "bg-violet-800",
  url,
  className = "",
  children
}) => {
  return (
    <Link href={url}>
      <button
        className={`${color} text-white px-4 py-2 rounded-2xl hover:scale-104 transition duration-500 ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default CustomButton;
