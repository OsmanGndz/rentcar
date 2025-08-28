"use client"
import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const faqsData = [
    {
      question: "How does it work?",
      answer: "You choose a car, select rental dates, and confirm your booking. The car will be ready for pickup at the agreed time.",
    },
    {
      question: "Can I cancel my reservation?",
      answer: "Yes, you can cancel up to 24 hours before your scheduled pickup without any fees.",
    },
    {
      question: "Do you offer insurance?",
      answer: "Yes, all our rentals include basic insurance. Additional coverage can be added during booking.",
    },
  ]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className='w-full flex flex-col py-15 gap-10'>
      <h1 className='font-bold text-[50px] w-full text-center'>
        Top Car Rental Questions
      </h1>

      <div className='flex flex-col gap-6'>
        {faqsData.map((faq, idx) => (
          <div
            key={idx}
            className='flex flex-col w-full border p-6 rounded-xl cursor-pointer gap-4'
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className='w-full flex flex-row items-center justify-between cursor-pointer'
            >
              <h1 className='font-semibold text-[24px] text-start'>{faq.question}</h1>
              <IoIosArrowDown
                className={`transition-transform duration-500 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === idx && (
              <div className='w-full text-[18px] text-gray-700 '>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
