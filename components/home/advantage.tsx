import Image from "next/image";
import React from "react";

const advantages = [
  {
    name: "Availability",
    desc: "Wide range of vehicles ready whenever you need them, with flexible booking options.",
    icon: "/assets/homePage/location.png",
  },
  {
    name: "Comfort",
    desc: "Modern and well-maintained cars designed to make every journey smooth and enjoyable.",
    icon: "/assets/homePage/car.png",
  },
  {
    name: "Savings",
    desc: "Affordable rental plans with no hidden fees, giving you the best value for your money.",
    icon: "/assets/homePage/wallet.png",
  },
];

const Advantage = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-8 md:gap-4 xl:gap-0">
      {advantages.map((item) => (
        <div
          key={`Advantages - ${item.name}`}
          className="max-w-[350px] flex flex-col items-center justify-center text-center gap-5 mx-auto"
        >
          <div className="flex flex-col w-full items-center gap-4">
            <Image
              src={item.icon}
              alt={`advantage - ${item.name} image`}
              width={64}
              height={64}
            />
            <h1 className="text-[24px] font-semibold">{item.name}</h1>
          </div>
          <p className="w-full">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Advantage;
