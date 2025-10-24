'use client';

import Image from "next/image";
import SearchComponent from "./search_component";
import { montserrat } from "@/utils/fonts";
import { FaBars } from "react-icons/fa6";
import { useCallback } from "react";
import { useAddEventStore } from "@/hooks/useAddEventModal";
import { ClerkLoaded, ClerkLoading, useAuth, UserButton, useUser } from "@clerk/nextjs";

interface TopSectionProps {
    handleSearch: (category: string, city: string, date: Date) => void
}


export default function TopSection({handleSearch}: TopSectionProps){
    const openAddEventModal = useAddEventStore((state)=> state.open);

    return (
        <div className="relative w-full h-[70vh] overflow-hidden ">
            <Image src="/turf.jpg" alt="Bg image" fill className="object-cover blur-[0.75px] filter brightness-[0.7]"/>


            {/* Top-right menu */}
            <div className="absolute top-4 right-4 z-20 flex items-center space-x-4 pt-3 pr-5">
                {/* Example buttons/icons */}
                <div onClick={openAddEventModal} className={`${montserrat.className} rounded-full  transition cursor-pointer text-white font-bold`}>
                    ADD EVENT
                </div>

                <div className={`${montserrat.className} rounded-full transition cursor-pointer text-white font-bold`}>
                    FAVOURITES
                </div>

                <ClerkLoaded>
                    <UserButton  />
                </ClerkLoaded>
                <ClerkLoading>
                    <div></div>
                </ClerkLoading>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <h1 className={`${montserrat.className} text-white font-bold py-4 text-6xl`}>BEST SPORTS BOOKING</h1>     
        <h1 className={`${montserrat.className} text-white font-bold pb-10 text-6xl`}>PLATFORM IN YOUR AREA</h1>
        <h2 className={`${montserrat.className} text-white font-semibold text-2xl pb-10`}>More players, more games, more fun. Join in today.</h2>
        <SearchComponent handleSearch={handleSearch}/> 
                </div>
        </div>
    );
}