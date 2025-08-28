"use client"
import Image from "next/image";
import React from "react";

const statistics = [
  {
    name: "Cars",
    number: "540",
    icon: "/assets/homePage/cars.png",
  },
  {
    name: "Customers",
    number: "20k",
    icon: "/assets/homePage/customer.png",
  },
  {
    name: "Years",
    number: "25",
    icon: "/assets/homePage/years.png",
  },
  {
    name: "Miles",
    number: "20m",
    icon: "/assets/homePage/miles.png",
  },
];
const Numbers = () => {
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
            Facts In Numbers
          </h1>
          <p className="w-full md:w-[50%] text-center">
            {" "}
            Discover key statistics that highlight our journey, achievements,
            and the impact we’ve made over the years. Numbers that speak louder
            than words.
          </p>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 w-full text-black gap-4 md:gap-8 xl:gap-16">
          {statistics.map((item) => (
            <div
              key={`statistic - ${item.name}`}
              className="bg-white rounded-xl p-2 sm:p-4 flex flex-row gap-2 sm:gap-4"
            >
              <div className="bg-amber-500 p-1 sm:p-2 rounded-lg">
                <Image
                  src={item.icon}
                  alt={`statistic - icon - ${item.name}`}
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <p className="font-bold text-[16px] sm:text-[24px]">
                  {item.number}+
                </p>
                <p className="font-semibold text-[14px] sm:text-[16px] opacity-60">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Numbers;
