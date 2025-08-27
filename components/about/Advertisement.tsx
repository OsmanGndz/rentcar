"use client"
import Image from "next/image";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Advertisement = () => {
  return (
    <div className="w-full py-15 flex flex-row gap-[86px]">
      <div className="flex flex-col gap-10 w-1/2">
        <h1 className="text-[50px] font-bold">
          Unlock unforgettable memories on the road
        </h1>
        <p className="text-[16px] text-gray-700">
          Experience the freedom and thrill of driving with our premium car rental service. We provide you with a wide variety of vehicles and top-notch support to make every trip memorable.
        </p>
        <div className="w-full grid grid-cols-2 gap-10 text-[16px]">
          <div className="flex gap-2">
            <FaCheckCircle className="text-violet-800 text-[36px]"/>
            <p>Wide selection of high-quality cars to fit every journey.</p>
          </div>
          <div className="flex  gap-2">
            <FaCheckCircle className="text-violet-800 text-[36px]"/>
            <p>24/7 customer support to assist you anytime.</p>
          </div>
          <div className="flex  gap-2">
            <FaCheckCircle className="text-violet-800 text-[36px]"/>
            <p>Flexible rental plans for short trips or long adventures.</p>
          </div>
          <div className="flex  gap-2">
            <FaCheckCircle className="text-violet-800 text-[36px]"/>
            <p>Easy booking process with transparent pricing.</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 relative">
        <Image src="/assets/aboutPage/familyCar.jpg" alt="about family car image" fill className="object-cover rounded-xl"  />
      </div>
    </div>
  );
};

export default Advertisement;
