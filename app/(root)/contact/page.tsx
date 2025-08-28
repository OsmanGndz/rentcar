"use client";
import Link from "next/link";
import React from "react";
import Booking from "../../../components/contact/Booking";
import ContactInfo from "../../../components/contact/ContactInfo";
import Brands from "../../../components/contact/Brands";

const Contact = () => {
  return (
    <div className="w-full flex flex-col">
      <section className="w-full flex flex-col py-15 items-center gap-5">
        <h1 className="font-bold text-[50px]">Contact Us</h1>
        <div className="w-fit flex flex-row">
          <Link href="/" className="text-[20px] text-gray-500 cursor-pointer">
            Home /{" "}
          </Link>
          <p className="text-[20px] ml-2 ">Contact Us</p>
        </div>
      </section>
      <section className="w-full py-15">
        <Booking />
      </section>
      <section className="w-full py-15">
        <ContactInfo />
      </section>
      <section className="w-full py-15">
        <Brands />
      </section>
    </div>
  );
};

export default Contact;
