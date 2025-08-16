"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { closeSidebar } from "../redux/features/sidebarSlice";
import Link from "next/link";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { FaHome, FaInfo } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import CustomButton from "./common/button";
import { CiLogin } from "react-icons/ci";
import { usePathname } from "next/navigation";

const menus = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icon: <FaHome className="text-xl" />,
  },
  {
    id: 2,
    name: "Vehicles",
    url: "/vehicles",
    icon: <IoCarSport className="text-xl" />,
  },
  {
    id: 3,
    name: "About Us",
    url: "/about",
    icon: <FaInfo className="text-xl" />,
  },
  {
    id: 4,
    name: "Contact Us",
    url: "/contact",
    icon: <MdMessage className="text-xl" />,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 block lg:hidden transition-opacity duration-500 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={() => dispatch(closeSidebar())}
    >
      <div
        className={`fixed top-0 left-0 flex flex-col h-full w-[80%] bg-white shadow-lg transition-transform duration-500 ease-in-out overflow-y-auto px-2 py-2 justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="border-b border-gray-400">
            <button
              className="absolute top-5 right-5"
              onClick={() => dispatch(closeSidebar())}
            >
              <IoMdClose className="text-xl" />
            </button>
            {/* Sidebar içeriği */}
            <div className="flex flex-row space-x-2 items-center">
              <Image src="/logo.png" alt="car logo" width={48} height={48} />
              <h2 className="text-[16px] font-bold">Rent Car</h2>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            {menus.map((item) => {
              const isActive =
                item.url === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.url);
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  className={`flex flex-row text-lg items-center gap-2 rounded-lg px-2 py-2 transition-colors duration-200 ${
                    isActive
                      ? "bg-violet-600 text-white"
                      : "hover:bg-gray-100 text-gray-900"
                  }`}
                  onClick={() => dispatch(closeSidebar())}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <CustomButton
            url="/login"
            className="flex flex-row items-center space-x-2 cursor-pointer"
          >
            <p>Login</p>
            <CiLogin className="text-lg md:text-xl" />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
