"use client";

import React, { useEffect, useState } from "react";
import CarTypeButton from "../../../components/CarTypeButton";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { FaSnowflake } from "react-icons/fa";
import Card from "../../../components/card";
import api from "../../../lib/axios";

const vehicles = [
  { value: "All vehicles", id: "All" },
  { value: "Sedan", id: "Sedan", icon: "/assets/vehiclePage/sedanIcon.png" },
  {
    value: "Cabriolet",
    id: "Cabriolet",
    icon: "/assets/vehiclePage/cabriolet.png",
  },
  { value: "Pickup", id: "Pickup", icon: "/assets/vehiclePage/pickup.png" },
  { value: "SUV", id: "SUV", icon: "/assets/vehiclePage/suv.png" },
  { value: "Minivan", id: "Minivan", icon: "/assets/vehiclePage/minivan.png" },
];

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

const Vehicles = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [vehicleType, setVehicleType] = useState(
    searchParams.get("vehicle type") || "All"
  );
  const [carss, setCarss] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await api.get("/admin/car", {
        params: {
          category: vehicleType === "All" ? "" : vehicleType,
        },
      });
      console.log("cars", response.data.cars);
      setCarss(response.data.cars);
    };
    fetchCars();
    console.log("usestate", carss);
  }, [vehicleType]);

  const handleClick = (id: string) => {
    setVehicleType(id);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (vehicleType) {
      params.set("vehicle type", vehicleType);
    } else {
      params.delete("vehicle type");
    }

    router.replace(`?${params.toString()}`);
  }, [vehicleType, router]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center py-15 gap-10">
        <h1 className="text-[50px] font-bold">Select a vehicle group</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 font-medium text-[16px] gap-3 md:gap-6">
          {vehicles.map((vehicle) => (
            <CarTypeButton
              key={vehicle.id}
              className=""
              selected={vehicleType === vehicle.id}
              onClick={() => handleClick(vehicle.id)}
            >
              {vehicle.icon && (
                <div className="">
                  <Image
                    src={vehicle.icon}
                    alt={`${vehicle.id} - image`}
                    width={24}
                    height={24}
                  />
                </div>
              )}
              {vehicle.value}
            </CarTypeButton>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {carss.map((item) => {
            const {
              id,
              image,
              brand,
              category,
              price,
              model,
              equipment,
              technical,
            } = item;
            return (
              <Card
                key={`card - ${brand} - ${category} - ${model} - ${price}`}
                id={id}
                image={image}
                brand={brand}
                type={model}
                price={price}
                freq={"per day"}
                features={equipment}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full py-15">
        <div className="w-full grid grid-cols-3 md:grid-cols-6 py-10 lg:py-15 bg-gray-100 px-6 lg:px-10 rounded-3xl gap-6 md:gap-0">
          {brands.map((brand) => (
            <div
              key={brand.id}
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
    </div>
  );
};

export default Vehicles;
