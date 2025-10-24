"use client";

import React, { startTransition, useCallback, useState } from 'react'
import TopSection from './Topsection/top_section'
import SearchComponent from './Topsection/search_component'
import AddEventmodal from './AddEventmodal'
import SportsCardSection from './SportCardsSection/sports_card_section'
import { montserrat } from '@/utils/fonts'
import { SportEvent } from './SportCardsSection/sport_card'
import { searchEvent } from '@/actions/event.actions';

interface HomeClientProps {
  initialEvents: SportEvent[];
}

const HomeClient = ({initialEvents}: HomeClientProps) => {
   const [events,setEvents] = useState(initialEvents);

   const handleSearch = useCallback(async (category: string, city: string, date: Date) => {
   
      try {
        const results = await searchEvent(category, city, date);
        console.log("GOT RESULTS", results);
        setEvents(results);
    } catch (err) {
        console.error("searchEvent failed:", err);
    }
   
  }, []);

   
  return (
    <div className="min-h-screen flex flex-col">
      <TopSection handleSearch={handleSearch} />
      

      <div className={`${montserrat.className} text-black text-[20px] font-bold pt-10 pl-10 `}>
        Explore people playing nearby
      </div>

      <AddEventmodal />

      

      <SportsCardSection initialEvents={events}  />
    </div>
  )
}

export default HomeClient
