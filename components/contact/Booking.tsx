"use client";
import React, { useState } from "react";
import DropDown from "../common/dropDown";
import DateInput from "../common/dateInput";
import Image from "next/image";

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

const Booking = () => {
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
    <div className="flex flex-col lg:flex-row w-full gap-6">
      <form
        onSubmit={handleBookingSubmit}
        className="w-full lg:w-[45%] flex flex-col items-center bg-violet-800 rounded-2xl p-8 gap-8"
      >
        <h1 className="font-semibold text-[28px] text-white">Book your car</h1>
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
      <div className="hidden lg:flex w-full relative">
        <Image src="/assets/homePage/HeroCarPhoto.jpg" alt="contact page car image" fill className="object-cover rounded-xl" />
      </div>
    </div>
  );
};

export default Booking;
