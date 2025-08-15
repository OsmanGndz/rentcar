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
    <div className="flex flex-col pt-15 px-18 pb-10 space-y-15">
      <div className="grid grid-cols-4 items-start">
        <div className="w-full">
          <Link href="/" className="flex flex-row space-x-2 items-center w-fit">
            <Image src="/logo.png" alt="car logo" width={48} height={48} />
            <h2 className="text-[16px] font-bold">Rent Car</h2>
          </Link>
        </div>
        <div className="flex flex-row h-10 space-x-2 justify-center">
          <div className="bg-amber-500 h-10 w-10 rounded-full flex items-center justify-center">
            <Image
              src="/assets/location.png"
              alt="location"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-col space-y-1 text-sm">
            <h2>Address</h2>
            <p className="font-semibold">Konya/Turkey</p>
          </div>
        </div>
        <div className="flex flex-row h-10 space-x-2 justify-center">
          <div className="bg-amber-500 h-10 w-10 rounded-full flex items-center justify-center">
            <Image src="/assets/email.png" alt="email" width={24} height={24} />
          </div>
          <div className="flex flex-col space-y-1 text-sm">
            <h2>Email</h2>
            <p className="font-semibold">osmangunduz517@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-row h-10 space-x-2 justify-end">
          <div className="bg-amber-500 h-10 w-10 rounded-full flex items-center justify-center">
            <Image src="/assets/phone.png" alt="phone" width={24} height={24} />
          </div>
          <div className="flex flex-col space-y-1 text-sm">
            <h2>Phone</h2>
            <p className="font-semibold">+90 553 089 78 62</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 items-start flex-grow">
        <div className="w-full flex flex-col space-y-2 h-full">
          <p className="font-semibold w-full">
            Providing reliable and affordable car rental services to make your
            journey smoother and more enjoyable – anytime, anywhere.
          </p>
          <div className="flex flex-row space-x-5 mt-auto">
            {socialMedia.map((media, idx) => (
              <Link key={`${media.name}`} href={media.url}>
                <Image
                  src={media.image}
                  alt={media.name}
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div>
            <h1 className="mb-6 font-semibold text-lg">Useful Links</h1>
            <div className="flex flex-col">
              {usefulLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className="hover:underline"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div>
            <h1 className="mb-6 font-semibold text-lg">Vehicles</h1>
            <div className="flex flex-col ">
              {vehicles.map((vehicle) => (
                <Link
                  href={vehicle.url}
                  key={vehicle.name}
                  className="hover:underline"
                >
                  {vehicle.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-end">
          <h1 className="mb-6 font-semibold text-lg">Download App</h1>
          <div className="w-full flex flex-row justify-end items-center">
            <Link
              href="/"
              className="w-48 bg-black px-4 py-2 flex flex-row space-x-4 rounded-md hover:scale-104 transition duration-500"
            >
              <Image
                src="/assets/apple.png"
                alt="apple logo"
                width={26}
                height={31}
              />
              <div className="text-white flex flex-col ">
                <p className="text-[12px] font-light">Download on the</p>
                <p className="font-semibold text-lg">App Store</p>
              </div>
            </Link>
          </div>
          <div className="w-full flex flex-row justify-end items-center mt-6">
            <Link
              href="/"
              className="w-48 bg-black px-4 py-2 flex flex-row space-x-4 rounded-md hover:scale-104 transition duration-500"
            >
              <Image
                src="/assets/playstore.png"
                alt="playstore logo"
                width={30}
                height={32}
              />
              <div className="text-white flex flex-col ">
                <p className="text-[12px] font-light">GET IT ON</p>
                <p className="font-semibold text-lg">Google Play</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
