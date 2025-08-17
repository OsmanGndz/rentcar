"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomButton from "./common/button";
import { CiLogin } from "react-icons/ci";
import { TiThMenu } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { toggleSidebar } from "../redux/features/sidebarSlice";
import { usePathname } from "next/navigation";

const menus = [
  {
    id: 1,
    name: "Home",
    url: "/",
  },
  {
    id: 2,
    name: "Vehicles",
    url: "/vehicles",
  },
  {
    id: 3,
    name: "About Us",
    url: "/about",
  },
  {
    id: 4,
    name: "Contact Us",
    url: "/contact",
  },
];
const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const path = usePathname();
  console.log(path)
  return (
    <div className="px-2 lg:px-18 py-7 w-full">
      <nav className="flex flex-row w-full items-center justify-between">
        <div>
          <Link href="/" className="flex flex-row space-x-2 items-center">
            <Image src="/logo.png" alt="car logo" width={48} height={48} />
            <h2 className="text-[16px] font-bold">Rent Car</h2>
          </Link>
        </div>
        <div className="hidden lg:flex flex-row text-[18px] font-medium space-x-10">
          {menus.map((item, idx) => (
            <Link key={`${idx}-${item.name}`} href={item.url} className={`${path === item.url ? "text-amber-500 underline": ""}`}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className="font-medium text-base md:text-[18px] flex flex-row items-center gap-4">
          <CustomButton
            url="/login"
            className="hidden md:flex flex-row items-center space-x-2 cursor-pointer"
          >
            <p>Login</p>
            <CiLogin className="text-lg md:text-xl" />
          </CustomButton>
          <button
            className="cursor-pointer flex lg:hidden"
            onClick={() => dispatch(toggleSidebar())}
          >
            <TiThMenu className="text-2xl" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
