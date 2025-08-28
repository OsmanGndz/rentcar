"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface carImageType {
  id: string;
  url: string;
}

const ImageSlider = ({
  carImages,
  event,
}: {
  carImages: carImageType[];
  event: (val: carImageType) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth || 0);
  var offset = 0;

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    if (screenWidth > 640) {
      offset = 28;
    }
    offset = 10;
  }, []);

  const itemWidth = () => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      if (firstChild) return firstChild.offsetWidth + offset;
    }
    return 200;
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -itemWidth(), behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: itemWidth(), behavior: "smooth" });
  };

  return (
    <div className="w-full relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow cursor-pointer hover:bg-violet-500"
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow cursor-pointer hover:bg-violet-500"
      >
        <IoIosArrowForward />
      </button>

      <div
        ref={scrollRef}
        className="w-full flex gap-2 sm:gap-4 lg:gap-6 overflow-x-auto py-2 scroll-smooth no-scrollbar"
      >
        {carImages.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[49%] sm:w-[32%] lg:w-[31%] h-32 relative cursor-pointer hover:scale-105 transition duration-500"
            onClick={() => event(item)}
          >
            <Image
              src={item.url}
              alt={item.id}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
