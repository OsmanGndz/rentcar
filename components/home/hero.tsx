"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import CustomButton from "../common/button";
import DropDown from "../common/dropDown";
import DateInput from "../common/dateInput";

const carTypes = ["Sedan", "Cabriolet", "Pickup", "Minivan", "SUV"];
const rentalPlaces = [
  "Konya",
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Aksaray",
  "Kayseri",
  "Antalya",
];

const Hero = () => {
  const [booking, setBooking] = useState({
    carType: "",
    placeOfRental: "",
    placeOfReturn: "",
    rentalDate: null as Date | null,
    returnDate: null as Date | null,
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(booking);
    setBooking({
      carType: "",
      placeOfRental: "",
      placeOfReturn: "",
      rentalDate: null,
      returnDate: null,
    });
  };

  return (
    <div className="w-full h-full relative rounded-3xl">
      <div className="absolute inset-0 bg-violet-800/70 z-10 rounded-3xl" />
      <Image
        src="/assets/homePage/HeroCarPhoto.jpg"
        alt="hero part car image"
        fill
        className="object-cover rounded-3xl"
      />
      <div className="flex flex-row items-center justify-center absolute z-12 w-full h-full p-4 sm:p-18 gap-11 text-center sm:text-start">
        <div className="w-full lg:w-[65%] flex flex-col items-center sm:items-start justify-center gap-8 ">
          <h1 className="text-[40px] sm:text-[50px] md:text-[60px] font-bold text-white">
            Experience the road like never before
          </h1>
          <p className="text-white text-light w-full lg:w-[65%] text-[16px] ">
            Discover comfort, safety, and freedom with our wide range of rental
            cars. Whether it’s a weekend getaway, a business trip, or your daily
            commute, we make every journey smooth and unforgettable.
          </p>
          <CustomButton
            color="bg-amber-500"
            url="/vehicles"
            className="px-8 w-fit"
          >
            View all cars
          </CustomButton>
        </div>
        <form
          onSubmit={handleBookingSubmit}
          className="w-[35%] hidden lg:flex flex-col items-center bg-white rounded-2xl p-8 gap-8"
        >
          <h1 className="font-semibold text-[28px]">Book your car</h1>
          <div className="w-full flex flex-col gap-5">
            <DropDown
              options={carTypes}
              placeholder="Car types"
              onSelect={(value) => setBooking({ ...booking, carType: value })}
              selectedValue={booking.carType}
            />
            <DropDown
              options={rentalPlaces}
              placeholder="Place of rental"
              onSelect={(value) =>
                setBooking({ ...booking, placeOfRental: value })
              }
              selectedValue={booking.placeOfRental}
            />
            <DropDown
              options={rentalPlaces}
              placeholder="Place of return"
              onSelect={(value) =>
                setBooking({ ...booking, placeOfReturn: value })
              }
              selectedValue={booking.placeOfReturn}
            />
            <DateInput
              placeholder="Rental date"
              selectedDate={booking.rentalDate}
              onDateChange={(date) =>
                setBooking({ ...booking, rentalDate: date })
              }
            />
            <DateInput
              placeholder="Return date"
              minDate={booking.rentalDate}
              selectedDate={booking.returnDate}
              onDateChange={(date) =>
                setBooking({ ...booking, returnDate: date })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded-lg cursor-pointer hover:scale-104 transition duration-500 "
          >
            Book now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
