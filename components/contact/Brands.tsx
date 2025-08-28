"use client"
import Image from "next/image";
import React from "react";

const brands = [
    {
      id: "toyota",
      src: "/assets/vehiclePage/toyota.png",
    },
    {
      id: "ford",
      src: "/assets/vehiclePage/ford.png",
    },
    {
      id: "mercedes",
      src: "/assets/vehiclePage/mercedes.png",
    },
    {
      id: "jeep",
      src: "/assets/vehiclePage/jeep.png",
    },
    {
      id: "bmw",
      src: "/assets/vehiclePage/bmw.png",
    },
    {
      id: "audi",
      src: "/assets/vehiclePage/audi.png",
    },
  ];

const Brands = () => {
  return (
    <div className="w-full py-15">
      <div className="w-full grid grid-cols-3 md:grid-cols-6 py-10 lg:py-15 bg-gray-100 px-6 lg:px-10 rounded-3xl gap-6 md:gap-0">
        {brands.map((brand) => (
          <div
            key={`${brand.id} contact page`}
            className="w-full h-[30px] sm:h-[40px] md:h-[50px] lg:h-[60px] relative"
          >
            <Image
              src={brand.src}
              alt={`${brand.id} - image`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
