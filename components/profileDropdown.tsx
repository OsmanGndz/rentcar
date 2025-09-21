"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { MdDateRange, MdLogout, MdPayment } from "react-icons/md";
import { auth } from "../services/firebase";
import api from "../lib/axios";
import { useRouter } from "next/navigation";

const options = [
  {
    name: "Account",
    path: "/my-account",
    icon: <FaUser />,
  },
  {
    name: "Reservations",
    path: "/my-reservations",
    icon: <MdDateRange />,
  },
  {
    name: "Payments",
    path: "/my-payments",
    icon: <MdPayment />,
  },
];

const ProfileDropdown = () => {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [userOpen, setUserOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setUserOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    await api.delete("/session");
    router.push("/");
  };

  return (
    <div ref={profileRef} className="relative">
      {/* Profile icon button */}
      <button
        className="w-full cursor-pointer hover:scale-105 transition duration-300"
        onClick={() => setUserOpen((prev) => !prev)}
      >
        <FaUserCircle className="w-8 h-8 text-violet-800" />
      </button>

      {/* Dropdown menu */}
      {userOpen && (
        <div className="absolute right-0 mt-2 bg-gray-100 p-2 rounded-md flex flex-col w-48 shadow-lg z-50">
          {options.map((item) => (
            <Link
              href={item.path}
              key={item.name}
              className="hover:bg-amber-500 hover:text-zinc-100 w-full py-1 px-2 rounded-md flex flex-row items-center gap-2"
              onClick={() => setUserOpen(false)}
            >
              {item.icon}
              <p>{item.name}</p>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="hover:bg-amber-500 hover:text-zinc-100 w-full py-1 px-2 rounded-md flex flex-row items-center gap-2 cursor-pointer"
          >
            <MdLogout />
            <p>Log Out</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
