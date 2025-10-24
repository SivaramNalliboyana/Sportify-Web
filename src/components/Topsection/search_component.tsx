'use client';

import { searchEvent } from '@/actions/event.actions';
import { usegetEventStore } from '@/hooks/useGetEvents';
import { montserrat } from '@/utils/fonts';
import { setDate } from 'date-fns';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { FiArrowDown, FiSearch } from 'react-icons/fi'
import { IoIosArrowDown } from "react-icons/io";

interface SearchComponentProps {
    handleSearch: (category: string, city: string, date: Date) => void
}

export default function SearchComponent({handleSearch}: SearchComponentProps) {
   const [city, selectCity] = useState("Munich");
   const [sport,selectSport] = useState("Cricket");
   const [date, selectDate] = useState<Date  | undefined>(undefined);
   const state = usegetEventStore();
    const today = new Date();

    useEffect(()=> {
        selectDate(today);
    }, [])

  return (
    <div className='flex w-[500px] bg-white z-10 shadow-sm rounded-lg'>
        <div className='flex w-full justify-between pl-5 pt-3 pb-4 pr-4'>

           {/* Type section */}
        <div className="flex flex-col items-start mr-5">
            <div className={`${montserrat.className} text-black text-[14px] font-semibold pb-2`}>
            Type
            </div>
           
            <select
                    id="sports"
                    value={sport}
                    onChange={(e) => selectSport(e.target.value)}
                    className={`${montserrat.className} w-full focus:outline-none pr-1`}>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Badminton">Badminton</option>
            </select>

        </div>

        {/* Location section */}
        <div className="flex flex-col items-start">
            <div className={`${montserrat.className} text-black text-[14px] font-semibold pb-2`}>
            Location
            </div>
   
            <select id="Location" value={city} onChange={(e)=> selectCity(e.target.value)} className={`${montserrat.className} w-full focus:outline-none pr-1`}>
                <option value="Dortmund">Dortmund</option>
                <option value="Munich">Munich</option>
                <option value="Berlin">Berlin</option>
                <option value="Frankfurt">Frankfurt</option>
            </select>
            

        </div>

        {/* Date section */}
        <div className="flex flex-col items-start ml-10">
            <div className={`${montserrat.className} text-black text-[14px] font-semibold pb-2`}>
            Date
            </div>
            
            <DatePicker
                id="dateTime"
                    selected={date}
                    onChange={(date) => {
                        if (!date){
                            selectDate(today);
                        }else{
                            selectDate(date);
                        }
                    }}
                    dateFormat="MMMM d, yyyy "
                    placeholderText="Pick date & time"

                    className={`${montserrat.className} w-full focus:outline-none cursor-pointer`}
                />
           
        </div>
              
              
              {/* Search icon section */}
              <div onClick={()=> handleSearch(sport, city, !date ? today: date)} className='flex items-center justify-center w-[45px] h-[45px]" bg-green-800 rounded-lg cursor-pointer'>
                <FiSearch className="text-white font-bold size-5" />
              </div>
        </div>
      
    </div>
  )
}
