"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropDownProps {
  options: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  selectedValue?: string;
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  placeholder = "Select option",
  onSelect,
  selectedValue,
}) => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggleDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    onSelect?.(value);
    setToggleDropDown(false);
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <button
        type="button"
        className="bg-gray-100 w-full py-2 px-4 rounded-lg flex flex-row items-center justify-between cursor-pointer"
        onClick={() => setToggleDropDown(!toggleDropDown)}
      >
        <p >
          {selectedValue || placeholder}
        </p>
        <IoIosArrowDown
          className={`transition-transform ${
            toggleDropDown ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`${
          toggleDropDown ? "flex" : "hidden"
        } absolute z-50 h-44 w-full flex-col bg-gray-100 mt-1 rounded-lg py-2 px-4 items-start overflow-y-scroll`}
      >
        {options.map((item) => (
          <button
            key={`dropdown-${item}`}
            type="button"
            className="w-full cursor-pointer hover:bg-amber-500 flex items-start hover:text-white p-1 rounded-lg"
            onClick={() => handleSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
