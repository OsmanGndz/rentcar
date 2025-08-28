"use client"
import Image from "next/image";
import React from "react";

const info = [
  {
    value: "Address",
    subValue: "rentcar address",
    icon: "/assets/location.png",
  },
  {
    value: "Email",
    subValue: "rentcar@gmail.com",
    icon: "/assets/email.png",
  },
  {
    value: "Phone",
    subValue: "+90 123 456 78 90",
    icon: "/assets/phone.png",
  },
  {
    value: "Opening hours",
    subValue: "Sun-Mon: 10 am - 10 pm",
    icon: "/assets/clock.png",
  },
];

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-0 lg:grid-cols-4 w-full">
      {info.map((item, id) => (
        <div key={`${item.value}`} className="flex flex-row items-center gap-2">
          <div className=" bg-amber-500 p-4 rounded-full relative">
            <Image
              src={item.icon}
              alt={`${item.value} contact image`}
              width={28}
              height={28}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-[20px]">{item.value}</h1>
            <p className="text-[20px]">{item.subValue}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
