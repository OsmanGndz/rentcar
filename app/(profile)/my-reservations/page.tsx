"use client"

import React from 'react'
import {useState} from "react"
import { FaCalendarCheck } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import Active from '../../../components/reservations/Active';
import Past from '../../../components/reservations/Past';


const page = () => {
  const [selectedMenu, setSelectedMenu] = useState("active")
  return (
    <div className = "w-full flex flex-col gap-4">
      <div className= "w-full flex flex-row items-center justify-center gap-16">
        <button onClick = {()=>{
          setSelectedMenu("active")
        }} className={`flex flex-row gap-2 items-center cursor-pointer px-4 py-2 ${selectedMenu === "active" && "bg-amber-500 text-white rounded-md"}`}>
        <FaCarSide size={24} />
          <p className="text-lg font-semibold">
          Active Reservations
          </p>
        </button>
        <button onClick = {()=>{
          setSelectedMenu("past")
        }} className={`flex flex-row gap-2 items-center cursor-pointer px-4 py-2 ${selectedMenu === "past" && "bg-amber-500 text-white rounded-md"}`}>
        <FaCalendarCheck size={24} />
          <p className="text-lg font-semibold">
          Past Reservations
          </p>
        </button>
      </div>
      {
        selectedMenu === "active" ? (
          <Active/>
        ):(
          <Past/>
        )
      }
    </div>
  )
}

export default page
