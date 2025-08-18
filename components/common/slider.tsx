"use client";

import React, { useRef, useState } from "react";

export type SliderItem = {
  title: string;
  text: string;
};

interface SliderProps {
  slides: SliderItem[];
  className?: string;
  slideClassName?: string;
  onIndexChange?: (index: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  slides,
  className = "",
  slideClassName = "",
  onIndexChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const amount = container.clientWidth * index;
    container.scrollTo({ left: amount, behavior: "smooth" });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const idx = Math.round(container.scrollLeft / container.clientWidth);
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      onIndexChange?.(idx);
    }
  };

  return (
    <div className={className}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-6"
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className={`min-w-full snap-start flex flex-col gap-2 ${slideClassName}`}
          >
            <h1 className="text-4xl font-bold">{s.title}</h1>
            <p className="font-light mt-2">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={`pager-${i}`}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={`cursor-pointer transition-all ${
              activeIndex === i
                ? "w-12 h-2 bg-white"
                : "w-8 h-1.5 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
