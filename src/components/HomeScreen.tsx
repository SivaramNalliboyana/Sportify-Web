

import React from 'react'
import TopSection from './Topsection/top_section';
import { useAddEventStore } from '@/hooks/useAddEventModal';
import AddEventmodal from './AddEventmodal';
import { montserrat } from '@/utils/fonts';
import SportsCardSection from './SportCardsSection/sports_card_section';
import { prisma } from '@/lib/prisma';

const HomeScreen = async () => {
  
  
  return (
    

    <div className="min-h-screen flex flex-col">
      <TopSection />

      <div className={`${montserrat.className} text-black text-[20px] font-bold pt-10 pl-10 `}>
        Explore people playing nearby
      </div>

      <AddEventmodal />

      

      <SportsCardSection />
    </div>
  );
}

export default HomeScreen
