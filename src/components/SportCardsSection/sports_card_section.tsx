import React from 'react'
import SportCard from './sport_card'
import { getEvents } from '@/actions/event.actions';


const SportsCardSection = async () => {
  const events = await getEvents();

  console.log({events});

  

  return (
    <div className='grid grid-cols-3 gap-8 pt-10 pl-10 pr-10 pb-10'>
      {events?.map((e)=> (<SportCard key={e.id} event={e} />))}
    </div>
  )
}

export default SportsCardSection
