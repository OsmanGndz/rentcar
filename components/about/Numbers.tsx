import React from "react";

const Numbers = () => {
  return (
    <div className="w-full flex items-center justify-center px-10 py-15">
      <div className="grid grid-cols-3 gap-72">
        <div className="flex flex-col">
          <h1 className="text-violet-800 font-bold text-[80px]">20k+</h1>
          <p className="font-bold text-[20px]">Happy customers</p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-violet-800 font-bold text-[80px]">540+</h1>
          <p className="font-bold text-[20px]">Count of cars</p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-violet-800 font-bold text-[80px]">25+</h1>
          <p className="font-bold text-[20px]">Years of experience</p>
        </div>
      </div>
    </div>
  );
};

export default Numbers;
