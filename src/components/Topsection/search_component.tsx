'use client';

import { montserrat } from '@/utils/fonts';
import React from 'react'
import { FiArrowDown, FiSearch } from 'react-icons/fi'
import { IoIosArrowDown } from "react-icons/io";


export default function SearchComponent() {
  return (
    <div className='flex w-[500px] bg-white z-10 shadow-sm rounded-lg'>
        <div className='flex w-full justify-between pl-5 pt-3 pb-4 pr-4'>

           {/* Type section */}
        <div className="flex flex-col items-start">
            <div className={`${montserrat.className} text-black text-[14px] font-semibold pb-2`}>
            Type
            </div>
            <div className="flex items-center justify-between">
            <div className={`${montserrat.className} text-gray-600 text-[14px] pr-2 font-medium`}>
                Cricket
            </div>
            <IoIosArrowDown className="text-gray-600 w-5 h-5" />
            </div>
        </div>

        {/* Location section */}
        <div className="flex flex-col items-start">
            <div className={`${montserrat.className} text-black text-[14px] font-semibold pb-2`}>
            Location
            </div>
            <div className="flex items-center justify-between">
            <div className={`${montserrat.className} text-gray-600 text-[14px] pr-2 font-medium`}>
                New York
            </div>
            <IoIosArrowDown className="text-gray-600 w-5 h-5" />
            </div>
        </div>

        {/* Date section */}
        <div className="flex flex-col items-start">
            <div className={`${montserrat.className} text-black text-[14px] font-semibold pb-2`}>
            Date
            </div>
            <div className="flex items-center justify-between">
            <div className={`${montserrat.className} text-gray-600 text-[14px] pr-2 font-medium`}>
                24.09.2025
            </div>
            <IoIosArrowDown className="text-gray-600 w-5 h-5" />
            </div>
        </div>
              
              
              {/* Search icon section */}
              <div className='flex items-center justify-center w-[45px] h-[45px]" bg-green-800 rounded-lg'>
                <FiSearch className="text-white font-bold size-5" />
              </div>
        </div>
      
    </div>
  )
}
