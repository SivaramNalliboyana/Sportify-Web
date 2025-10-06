

import Header from '@/components/Header'
import { montserrat } from '@/utils/fonts'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdOutlineLocationOn, MdOutlineSportsTennis } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineSportsCricket } from "react-icons/md";
import { IoFootballOutline } from 'react-icons/io5';
import { FaBasketball } from 'react-icons/fa6';
import { getEvent, visitEvent } from '@/actions/event.actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AddEventButton from '@/components/JoinEventButton';
import JoinEventButton from '@/components/JoinEventButton';

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

interface Params {
  id: string
}

const ViewEvent = async ({ params }: { params: { eventid: string } }) => {
    
    const event = await getEvent(params.eventid);

    console.log(event);

   
    if (event == null){
        return null;
    }


  return (
    <div className='relative w-full min-h-screen'>
       <Header showText={true} />

       <div className='flex flex-row mt-16 ml-10 '>
            <div className='flex flex-col w-2/5 mr-20'>
                <h1 className={`${montserrat.className}  text-black font-bold text-2xl`}>{event.title}</h1>

                <div className='flex flex-row mt-4 gap-x-8'>
                    <div className='flex flex-row gap-x-2 items-center'>
                        <MdOutlineLocationOn size={16} className='text-gray-600'></MdOutlineLocationOn>
                        <h1 className={`${montserrat.className}  text-gray-600 font-bold text-1xl`}>{event.city}</h1>
                    </div>

                    <div className='flex flex-row gap-x-2 items-center'>
                        <LuCalendarDays size={16} className='text-gray-600'></LuCalendarDays>
                        <div className={`${montserrat.className}  text-gray-600 font-bold text-1xl`}>
                                              {formatDateTime(event.date)}
                                            </div>
                        
                    </div>

                    <div className='flex flex-row gap-x-2 items-center'>
                        {
                            event.category == "Cricket" ? <MdOutlineSportsCricket className="text-gray-600 w-3 h-3" /> : event.category == "Football" ? <IoFootballOutline className="text-gray-600 w-3 h-3" /> : event.category == "Basketball" ? <FaBasketball className="text-gray-600 w-3 h-3" /> : <MdOutlineSportsTennis className="text-gray-600 w-3 h-3" />
                        }
                        <h1 className={`${montserrat.className}  text-gray-600 font-bold text-1xl`}>{event.category}</h1>
                    </div>
                </div>

                <div className='relative w-full h-96 mt-8 '>
                    <Image src="/cricket.jpg" alt="Bg image" fill className='object-cover shadow-2xl' />
                </div>

                <div>

                </div>
            </div>

            <div className=' w-1/2'> 
                <div className='ml-10'>
                    
                    <div className='flex flex-row items-center gap-x-20'>

                        <h1 className={`${montserrat.className} text-black font-semibold text-[20px]`}>{event.visitors.length}/6 Going : {6-event.visitors.length} Spots left</h1>

                        <div className='flex flex-row gap-x-7 items-center w-[300px] h-15 bg-gray-50 inset-shadow-2xs border-[0.5px] rounded-full'>
                            <Image src="/profile.jpg" alt="Bg image" fill={false} width={60} height={60} className='object-fill shadow-2xl rounded-full' />

                            <h1 className={`${montserrat.className}  text-black font-semibold text-[16px]`}>Host : {event.creator.name}</h1>
                        </div>

                        
                    </div>
                
                    <div className='grid grid-cols-2 gap-4 mt-[40px] h-[330px]'>
                        
                        {event.visitors.length != 0 && (
                            event.visitors.map((visitor) => (
                                <div key={visitor.userId} className='flex flex-row gap-x-7 items-center w-[300px] h-16 bg-gray-50 inset-shadow-2xs border-[0.5px] rounded-full'>
                                    {visitor.user.image != null && (<Image src={visitor.user.image} alt="Bg image" fill={false} width={60} height={60} className='object-fill shadow-2xl rounded-full' />)}
                                    <h1 className={`${montserrat.className}  text-black font-semibold text-[20px]`}>{visitor.user.name}</h1>
                                </div>
                            ))
                        )}
                    </div>


                    <JoinEventButton eventid={params.eventid}/>


                </div>
            </div>
       </div>

       
    </div>
  )
}

export default ViewEvent
