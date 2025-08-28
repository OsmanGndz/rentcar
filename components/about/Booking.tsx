"use client";
import Image from "next/image";
import React from "react";
import CustomButton from "../common/button";
import Link from "next/link";

const Booking = () => {
  return (
    <div className="size-full relative rounded-3xl p-4 md:p-10 xl:p-15 overflow-hidden">
      <div className="absolute z-10 inset-0 bg-violet-800/70 rounded-3xl" />
      <Image
        src="/assets/homePage/HeroCarPhoto.jpg"
        alt="numbers-home-page car image"
        fill
        className="object-cover rounded-3xl z-0"
      />
      <Image
        src="/assets/homePage/road.png"
        alt="numbers-home-page road image"
        width={900}
        height={900}
        className="absolute z-20 top-30 -right-70 rotate-130"
      />
      <div className="flex flex-col gap-6 md:gap-10 xl:gap-20 w-full relative z-30 text-white">
        <div className="flex flex-col w-full items-center gap-2 md:gap-3 xl:gap-5">
          <h1 className="font-bold text-[30px] sm:text-[50px] text-center sm:text-start">
            Looking for a car?
          </h1>
          <p className="font-semibold text-[30px]">+90 123 456 78 90</p>
          <p className="w-full md:w-[50%] text-center">
            Find your perfect ride with ease and confidence. From compact cars
            to luxury SUVs, our fleet is designed to meet every need. Let us
            make your journey smooth and memorable.
          </p>
          <Link href="/" className="w-fit bg-amber-500 py-2 px-4 rounded-lg hover:scale-104 transition duration-500 ">
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Booking;
