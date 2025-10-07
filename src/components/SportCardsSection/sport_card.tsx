"use client";

import { montserrat } from '@/utils/fonts'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineSports } from "react-icons/md";
import { MdOutlineSportsCricket } from "react-icons/md";
import { IoFootballOutline } from "react-icons/io5";
import { FaBasketball } from "react-icons/fa6";
import { MdOutlineSportsTennis } from "react-icons/md";

import { IoLocationSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { getEvents, markasFavourite } from '@/actions/event.actions';
import { FaHeart } from "react-icons/fa";
import Link from 'next/link';


type Events = ({
  favourites: { userId: string }[];
  creator: { name: string; image: string | null };
  visitors: {userId: string}[];
} & {
  id: string;
  image: string;
  createdAt: Date;
  title: string;
  date: Date;
  city: string;
  category: string;
  creatorId: string;
})[]

export type SportEvent = Events[number];

function formatDateTime(date: Date) {
  const day = date.getDate();
  const ordinal = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const month = date.toLocaleString("en-US", { month: "short" }); // "Sept"


  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase(); // "6:30 pm"

  return `${day}${ordinal(day)} ${month}, ${time}`;
};

const SportCard = ({event}: {event:SportEvent}) => {
    const [hasLiked, setHasLiked] = useState(event.favourites.length == 0);
    const [isLiking, setIsLiking] = useState(false);

    const handleLike = async ()=> {
        if (isLiking) return;


        try {
            setIsLiking(true);
            setHasLiked(!hasLiked);
            await markasFavourite(event.id);
        } catch (error) {
            setHasLiked(hasLiked);
        }finally{
            setIsLiking(false);
        }

    }

  return (
    
    <div className='w-full h-[21rem] inset-shadow-2xs border-[0.5px] border-gray-200 rounded-lg'>

      <div className='relative overflow-hidden w-full h-[13rem] rounded-t-lg'>
            <Image src={event.image} alt="Bg image" fill className='object-cover'></Image>

            <div className="flex items-center absolute top-3 left-0 right-0 z-10 pr-3 pl-3 justify-between">
                
                {/*Location container*/}
                <div className="bg-white px-3 py-1 rounded-3xl ">
                    <div className='flex items-center'>
                        <IoLocationSharp className="text-black w-3 h-3" />
                        <div className={`${montserrat.className} text-black text-[13px] pr-1 pl-2 font-medium`}>
                                    {event.city}
                        </div>
                    </div>
                </div>

                {/*Heart icon container*/}
                <div onClick={handleLike} className='flex rounded-full bg-white items-center justify-center w-[28px] h-[28px] transition cursor-pointer'>
                    {hasLiked ? (<FaHeart className='text-red-500 w-3.5 h-4' />) : (<FaRegHeart className={`text-black w-3.5 h-4`} />)}
                    
                </div>



            </div>
      </div>

     <Link href={`/events/${event.id}`}>
      <div className='pt-5 pl-5'>
        <h1 className={`${montserrat.className} text-black font-semibold text-[18px]`}>{event.title}</h1>
        
         {/* Outer row for host name and date*/}    
        <div className="flex items-center pt-2 justify-between pr-5">

           {/* First row */}
            <div className='flex items-center'>
                <IoPersonSharp className="text-gray-600 w-3 h-3" />
            <div className={`${montserrat.className} text-gray-600 text-[14px] pr-2 pl-3 font-medium`}>
                        Hosted by: {event.creator.name}
                    </div>
            </div>


            {/* Second row */}
            <div className='flex items-center'>
                <MdOutlineDateRange className="text-gray-600 w-3 h-3" />
            <div className={`${montserrat.className} text-gray-600 text-[14px] pr-2 pl-3 font-medium`}>
                      {formatDateTime(event.date)}
                    </div>
            </div>
                </div>
        

        
        <div className="flex items-center pt-2 justify-between pr-5">
            
            {/* Info abt going users*/}
             <div className='flex items-center'>
                <MdOutlineSports className="text-gray-600 w-3 h-3" />
            <div className={`${montserrat.className} text-gray-600 text-[14px] pr-2 pl-3 font-medium`}>
                        {event.visitors.length} / 6 Going
                    </div>
            </div>

            {/* Info abt category*/}
             <div className='flex items-center'>
                {
                    event.category == "Cricket" ? <MdOutlineSportsCricket className="text-gray-600 w-3 h-3" /> : event.category == "Football" ? <IoFootballOutline className="text-gray-600 w-3 h-3" /> : event.category == "Basketball" ? <FaBasketball className="text-gray-600 w-3 h-3" /> : <MdOutlineSportsTennis className="text-gray-600 w-3 h-3" />
                }
            <div className={`${montserrat.className} text-gray-600 text-[14px] pr-2 pl-3 font-medium`}>
                        {event.category}
                    </div>
            </div>    

        </div>
     
      </div>  
       </Link>

    </div>
   
  )
}

export default SportCard
