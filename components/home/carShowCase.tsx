import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Card from "../card";
import { FaSnowflake } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";

const cars = [
  {
    id: 1,
    image: "/assets/homePage/HeroCarPhoto.jpg",
    brand: "Tesla",
    type: "Model 3",
    price: 120,
    freq: "per day",
    features: [
      { name: "Electric", icon: <BsFillFuelPumpFill /> },
      { name: "Auto", icon: <GiGearStickPattern /> },
      { name: "AC", icon: <FaSnowflake /> },
    ],
  },
  {
    id: 2,
    image: "/assets/homePage/HeroCarPhoto.jpg",
    brand: "BMW",
    type: "X5",
    price: 150,
    freq: "per day",
    features: [
      { name: "Petrol", icon: <BsFillFuelPumpFill /> },
      { name: "Auto", icon: <GiGearStickPattern /> },
      { name: "AC", icon: <FaSnowflake /> },
    ],
  },
  {
    id: 3,
    image: "/assets/homePage/HeroCarPhoto.jpg",
    brand: "Audi",
    type: "A4",
    price: 100,
    freq: "per day",
    features: [
      { name: "Diesel", icon: <BsFillFuelPumpFill /> },
      { name: "Manual", icon: <GiGearStickPattern /> },
      { name: "AC", icon: <FaSnowflake /> },
    ],
  },
  {
    id: 4,
    image: "/assets/homePage/HeroCarPhoto.jpg",
    brand: "Tesla",
    type: "Sedan",
    price: 120,
    freq: "per day",
    features: [
      { name: "Electric", icon: <BsFillFuelPumpFill /> },
      { name: "Auto", icon: <GiGearStickPattern /> },
      { name: "AC", icon: <FaSnowflake /> },
    ],
  },
  {
    id: 5,
    image: "/assets/homePage/HeroCarPhoto.jpg",
    brand: "BMW",
    type: "Minivan",
    price: 150,
    freq: "per day",
    features: [
      { name: "Petrol", icon: <BsFillFuelPumpFill /> },
      { name: "Auto", icon: <GiGearStickPattern /> },
      { name: "AC", icon: <FaSnowflake /> },
    ],
  },
  {
    id: 6,
    image: "/assets/homePage/HeroCarPhoto.jpg",
    brand: "Audi",
    type: "SUV",
    price: 100,
    freq: "per day",
    features: [
      { name: "Diesel", icon: <BsFillFuelPumpFill /> },
      { name: "Manual", icon: <GiGearStickPattern /> },
      { name: "AC", icon: <FaSnowflake /> },
    ],
  },
];

const CarShowCase = () => {
  return (
    <div className="mt-15 w-full flex flex-col gap-10">
      <div className="flex flex-row w-full">
        <h1 className="w-[40%] text-[50px] font-bold">
          Choose the car that suits you
        </h1>
        <div className="w-[60%] flex items-end justify-end">
          <Link
            href="/vehicles"
            className="flex flex-row gap-1 items-center text-[20px] font-bold"
          >
            <p>View All</p>
            <FaArrowRightLong />
          </Link>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-6">
        {cars.map((item) => {
          const { id, image, brand, type, price, freq, features } = item;
          return (
            <Card
              key={`card - ${brand} - ${type}`}
              id={id}
              image={image}
              brand={brand}
              type={type}
              price={price}
              freq={freq}
              features={features}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CarShowCase;
