"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaCheckCircle, FaSnowflake } from "react-icons/fa";
import {
  GiCarDoor,
  GiCarSeat,
  GiGearStickPattern,
  GiPathDistance,
} from "react-icons/gi";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import CustomButton from "../../../../components/common/button";

const carImages = [
  {
    id: "1",
    url: "/assets/homePage/HeroCarPhoto.jpg",
  },
  {
    id: "2",
    url: "/assets/homePage/aston.jpg",
  },
  {
    id: "3",
    url: "/assets/homePage/HeroCarPhoto.jpg",
  },
  {
    id: "4",
    url: "/assets/homePage/aston.jpg",
  },
];

const carFeatures = [
  {
    id: "Gear box",
    icon: <GiGearStickPattern className="text-[24px]" />,
    value: "Gear Box",
    subValue: "Automat",
  },
  {
    id: "Fuel",
    icon: <BsFillFuelPumpFill className="text-[24px]" />,
    value: "Fuel",
    subValue: "Petrol",
  },
  {
    id: "Doors",
    icon: <GiCarDoor className="text-[24px]" />,
    value: "Doors",
    subValue: "2",
  },
  {
    id: "Air Conditioner",
    icon: <FaSnowflake className="text-[24px]" />,
    value: "Air Conditioner",
    subValue: "Yes",
  },
  {
    id: "Seats",
    icon: <MdOutlineAirlineSeatReclineNormal className="text-[24px]" />,
    value: "Seats",
    subValue: "5",
  },
  {
    id: "Distance",
    icon: <GiPathDistance className="text-[24px]" />,
    value: "Distance",
    subValue: "500",
  },
];

const carEquipments = [
  {
    value: "ABS",
    exist: true,
  },
  {
    value: "Air Bags",
    exist: false,
  },
  {
    value: "Cruise Control",
    exist: true,
  },
  {
    value: "Air Conditioner",
    exist: false,
  },
  {
    value: "ABS",
    exist: false,
  },
  {
    value: "ABS",
    exist: true,
  },
];

const VehicleDetailsPage = () => {
  const params = useParams();
  const [carImage, setCarImage] = useState(carImages[0]);

  return (
    <div className="w-full flex flex-row py-15 gap-6">
      <div className="w-1/2 flex flex-col ">
        <div className="self-start">
          <h1 className="text-[40px] font-bold">BMW</h1>
          <div className="flex flex-row gap-1 items-center">
            <h1 className="font-semibold text-[40px] text-violet-600">$25</h1>
            <p className="text-gray-700">/day</p>
          </div>
        </div>
        <div className="w-full h-[300px] relative mt-5">
          <Image
            src={carImage.url}
            alt="image sad"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        <div className="w-full grid grid-cols-4 mt-5 gap-6">
          {carImages.map((item) => (
            <div className="w-full relative h-32 " key={item.id}>
              <Image
                src={item.url}
                alt={item.id}
                fill
                className="object-cover rounded-xl cursor-pointer hover:scale-104 transition duration-500"
                onClick={() => setCarImage(item)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-16">
        <div className="w-full flex flex-col gap-10">
          <h1 className="font-semibold text-[24px]">Technical Specification</h1>
          <div className="w-full grid grid-cols-3 gap-6">
            {carFeatures.map((feature, idx) => (
              <div
                key={`${feature.id} - ${idx}`}
                className="bg-gray-100 w-full flex flex-col p-4 rounded-xl gap-2"
              >
                {feature.icon}
                <p className="font-semibold text-[16px]">{feature.value}</p>
                <p className="text-gray-700">{feature.subValue}</p>
              </div>
            ))}
          </div>
        </div>
        <CustomButton url="/" className="w-fit min-w-[290px] text-center">
          Rent a car
        </CustomButton>
        <div className="w-full flex flex-col gap-10">
          <h1 className="text-[24px] font-semibold">Car Equipment</h1>
          <div className="grid grid-cols-3 w-full gap-15">
            {carEquipments.map((equipment, idx) => (
              <div key={`${equipment.value} - ${idx}`} className="flex flex-row gap-2 items-center">
                <FaCheckCircle
                  className={`${
                    equipment.exist ? "text-violet-800" : "text-gray-500"
                  } text-[18px]`}
                />
                <p>{equipment.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
