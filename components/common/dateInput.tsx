"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  placeholder?: string;
  selectedDate?: Date | null;
  onDateChange?: (date: Date | null) => void;
  className?: string;
  minDate?: Date | null;
}

const DateInput: React.FC<DateInputProps> = ({
  placeholder = "Select date",
  selectedDate,
  onDateChange,
  className = "",
  minDate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(selectedDate || null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Sync local state with parent prop
  useEffect(() => {
    setDate(selectedDate || null);
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
    onDateChange?.(newDate);
    setIsOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return placeholder;
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className={`relative ${className}`} ref={datePickerRef}>
      <button
        type="button"
        className="bg-gray-100 w-full py-2 px-4 rounded-lg flex flex-row items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{formatDate(date)}</span>
        <IoCalendarOutline className=" text-lg" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1">
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            inline
            dateFormat="dd/MM/yyyy"
            minDate={minDate || new Date()}
            placeholderText={placeholder}
            className="border-0 shadow-lg rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;
