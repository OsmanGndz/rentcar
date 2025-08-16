"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";

const socialMedia = [
  {
    name: "facebook",
    image: "/assets/facebook.png",
    url: "/",
  },
  {
    name: "instagram",
    image: "/assets/instagram.png",
    url: "/",
  },
  {
    name: "x",
    image: "/assets/x.png",
    url: "/",
  },
  {
    name: "youtube",
    image: "/assets/youtube.png",
    url: "/",
  },
];

const usefulLinks = [
  {
    name: "About us",
    url: "/about",
  },
  {
    name: "Contact us",
    url: "/contact",
  },
  {
    name: "Gallery",
    url: "/",
  },
  {
    name: "Blog",
    url: "/",
  },
  {
    name: "F.A.Q",
    url: "/",
  },
];

const vehicles = [
  {
    name: "Sedan",
    url: "/sedan",
  },
  {
    name: "Cabriolet",
    url: "/cabriolet",
  },
  {
    name: "Pickup",
    url: "/pickup",
  },
  {
    name: "Minivan",
    url: "/minivan",
  },
  {
    name: "SUV",
    url: "/suv",
  },
];

const Footer = () => {
  return (
    <footer className="">
      <div className="container px-4 sm:px-6 lg:px-18 pt-8 lg:pt-12 pb-6">
        {/* Contact Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Logo */}
          <div className="flex justify-start lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="car logo" width={48} height={48} />
              <h2 className="text-lg font-bold text-gray-800">Rent Car</h2>
            </Link>
          </div>
          
          {/* Address */}
          <div className="flex items-center justify-start lg:justify-center">
            <div className="bg-amber-500 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Image
                src="/assets/location.png"
                alt="location"
                width={24}
                height={24}
              />
            </div>
            <div className="ml-3 text-sm">
              <h3 className="text-gray-600 font-medium">Address</h3>
              <p className="font-semibold text-gray-800">Konya/Turkey</p>
            </div>
          </div>
          
          {/* Email */}
          <div className="flex items-center justify-start lg:justify-center">
            <div className="bg-amber-500 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Image src="/assets/email.png" alt="email" width={24} height={24} />
            </div>
            <div className="ml-3 text-sm">
              <h3 className="text-gray-600 font-medium">Email</h3>
              <p className="font-semibold text-gray-800 break-all">osmangunduz517@gmail.com</p>
            </div>
          </div>
          
          {/* Phone */}
          <div className="flex items-center justify-start lg:justify-end">
            <div className="bg-amber-500 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Image src="/assets/phone.png" alt="phone" width={24} height={24} />
            </div>
            <div className="ml-3 text-sm">
              <h3 className="text-gray-600 font-medium">Phone</h3>
              <p className="font-semibold text-gray-800">+90 553 089 78 62</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Description & Social Media */}
          <div className="xl:col-span-1">
            <p className="text-gray-600 font-medium mb-6 leading-relaxed">
              Providing reliable and affordable car rental services to make your
              journey smoother and more enjoyable – anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((media) => (
                <Link 
                  key={media.name} 
                  href={media.url}
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <Image
                    src={media.image}
                    alt={media.name}
                    width={28}
                    height={28}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Useful Links</h3>
            <div className="space-y-2">
              {usefulLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className="block text-gray-600 hover:text-amber-500 hover:underline transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Vehicles */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vehicles</h3>
            <div className="space-y-2">
              {vehicles.map((vehicle) => (
                <Link
                  key={vehicle.name}
                  href={vehicle.url}
                  className="block text-gray-600 hover:text-amber-500 hover:underline transition-colors duration-300"
                >
                  {vehicle.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Download App */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Download App</h3>
            <div className="flex flex-col space-y-4">
              {/* App Store */}
              <Link
                href="/"
                className="inline-block w-full max-w-[180px] bg-black px-4 py-3 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src="/assets/apple.png"
                    alt="apple logo"
                    width={24}
                    height={29}
                  />
                  <div className="text-white">
                    <p className="text-xs font-light">Download on the</p>
                    <p className="font-semibold text-base leading-tight">App Store</p>
                  </div>
                </div>
              </Link>

              {/* Google Play */}
              <Link
                href="/"
                className="inline-block w-full max-w-[180px] bg-black px-4 py-3 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src="/assets/playstore.png"
                    alt="playstore logo"
                    width={26}
                    height={28}
                  />
                  <div className="text-white">
                    <p className="text-xs font-light">GET IT ON</p>
                    <p className="font-semibold text-base leading-tight">Google Play</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

      
      </div>
    </footer>
  );
};

export default Footer;