"use client"
import Link from 'next/link'
import React from 'react'
import Advantage from '../../../components/about/Advantage'
import Video from '../../../components/about/Video'
import Numbers from '../../../components/about/Numbers'
import Advertisement from '../../../components/about/Advertisement'

const About = () => {
  return (
    <div className='w-full flex flex-col '>
      <section className='w-full flex flex-col py-15 items-center gap-5'>
        <h1 className='font-bold text-[50px]'>About Us</h1>
        <div className='w-fit flex flex-row'>
          <Link href="/" className='text-[20px] text-gray-500 cursor-pointer'>Home / </Link>
          <p className='text-[20px] ml-2 '>About Us</p>
        </div>
      </section>
      <section className='w-full'>
      <Advantage />
      </section>
      <section className='w-full'>
      <Video/>
      </section>
      <section className='w-full'>
      <Numbers/>
      </section>
      <section className='w-full'>
      <Advertisement/>
      </section>
    </div>
  )
}

export default About