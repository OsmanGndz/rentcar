import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLogin } from "react-icons/ci";
import CustomButton from "./common/button";

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
  return (
    <div className="px-18 py-7 w-full">
      <nav className="flex flex-row w-full items-center justify-between">
        <div>
          <Link href="/" className="flex flex-row space-x-2 items-center">
            <Image src="/logo.png" alt="car logo" width={48} height={48} />
            <h2 className="text-[16px] font-bold">Rent Car</h2>
          </Link>
        </div>
        <div className="flex flex-row text-[18px] font-medium space-x-10">
          {menus.map((item, idx) => (
            <Link key={`${idx}-${item.name}`} href={item.url}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className="font-medium text-[18px]">
          <CustomButton url="/login" className="flex flex-row items-center space-x-2 cursor-pointer">
            <p>Login</p>
            <CiLogin className="text-[24px]" />
          </CustomButton>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
