"use client";

import { visitEvent } from '@/actions/event.actions';
import { montserrat } from '@/utils/fonts';
import React from 'react'
import toast from 'react-hot-toast';

const JoinEventButton = ({eventid}: {eventid:string}) => {

    const handleVisit =async ()=>{
        try {
            const visit = await visitEvent(eventid);
            if (visit) {
                toast.success("U are visiting this event now");
            }else{
                toast.error("Failed");
            }
        } catch (error) {
            toast.success("Failed");
        }
    }
    
  return (
    <div onClick={handleVisit} className="w-full p-4  bg-green-400 rounded-md flex justify-center items-center transition cursor-pointer"> 
        <div className={`${montserrat.className} text-gray-800 font-bold text-[13px]`}>Join event</div>
    </div>
  )
}

export default JoinEventButton
