import React from "react";

const Advantage = () => {
  return (
    <div className="w-full flex flex-row py-20 gap-20">
      {/* Sol taraf - büyük başlık */}
      <div className="w-1/3">
        <h1 className="font-bold text-[50px] leading-tight">
          Where every drive feels extraordinary
        </h1>
      </div>

      {/* Sağ taraf - avantajlar */}
      <div className="w-2/3 grid grid-cols-2 gap-12">
        {/* 1 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-[28px]">Variety Brands</h2>
          <p className="text-lg text-gray-600">
            Choose from a wide selection of trusted car brands that fit your
            lifestyle and budget.
          </p>
        </div>

        {/* 2 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-[28px]">Awesome Support</h2>
          <p className="text-lg text-gray-600">
            Our team is here 24/7 to assist you with bookings, questions, and
            personalized recommendations.
          </p>
        </div>

        {/* 3 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-[28px]">Maximum Freedom</h2>
          <p className="text-lg text-gray-600">
            Drive without limits—pick up and drop off at locations that suit
            your plans.
          </p>
        </div>

        {/* 4 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-[28px]">Flexibility On The Go</h2>
          <p className="text-lg text-gray-600">
            Adjust your rental duration anytime and enjoy flexible options that
            adapt to your journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Advantage;
