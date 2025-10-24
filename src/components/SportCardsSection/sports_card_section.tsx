'use client';

import React, { useEffect, useState } from 'react'
import SportCard, { SportEvent } from './sport_card'
import { getEvents } from '@/actions/event.actions';
import { usegetEventStore } from '@/hooks/useGetEvents';

interface SportsCardSectionProps {
  initialEvents: SportEvent[];
}

const SportsCardSection = ({initialEvents} : SportsCardSectionProps ) => {

  


  return (
    <div className='grid grid-cols-3 gap-8 pt-10 pl-10 pr-10 pb-10'>
      {initialEvents.map((e)=> (<SportCard key={e.id} event={e} />))}
    </div>
  )
}

export default SportsCardSection
