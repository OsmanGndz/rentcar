"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import CustomButton from "./common/button";
import { IoSpeedometer } from "react-icons/io5";
import { FaSnowflake } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";

const equipmentIcons = [
  { name: "Electric", icon: <BsFillFuelPumpFill /> },
  { name: "Auto", icon: <GiGearStickPattern /> },
  { name: "AC", icon: <FaSnowflake /> },
  { name: "Cruise Control", icon: <IoSpeedometer /> },
];

interface featureProps {
  id: string;
  name: string;
  type: string;
}
interface cardProps {
  id: string;
  image: string;
  brand: string;
  type: string;
  price: number;
  freq: string;
  features: featureProps[];
}

const Card: React.FC<cardProps> = ({
  id,
  image,
  brand,
  type,
  price,
  freq,
  features,
}) => {
  return (
    <div className="w-full flex flex-col bg-gray-100 p-6 rounded-lg gap-5">
      <div className="w-full h-[288px] sm:h-[198px] xl:h-[288px] 2xl:h-[320px] relative rounded-lg shadow-md">
        <Image
          src={image}
          alt="home image"
          fill
          className="object-fill rounded-lg"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col">
            <h1 className="font-semibold text-[24px]">{brand}</h1>
            <p className="font-extralight"> {type} </p>
          </div>
          <div>
            <p className="text-violet-600 font-semibold text-[24px] text-end">
              $ {price}
            </p>
            <p className="font-extralight"> {freq} </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 font-extralight">
        {features.map((item) => (
          <div
            key={`feature - ${item.name} `}
            className="flex items-center gap-1"
          >
            {equipmentIcons.map((i) => {
              if (i.name == item.name) {
                return <>{i.icon}</>;
              }
            })}
            <p> {item.name} </p>
          </div>
        ))}
      </div>
      <CustomButton url={`/vehicles/${id}`} className="text-center rounded-lg">
        View Details
      </CustomButton>
    </div>
  );
};

export default Card;
