

import TopSection from './Topsection/top_section';
import { useAddEventStore } from '@/hooks/useAddEventModal';
import AddEventmodal from './AddEventmodal';
import { montserrat } from '@/utils/fonts';
import SportsCardSection from './SportCardsSection/sports_card_section';
import { prisma } from '@/lib/prisma';
import { getEvents, searchEvent } from '@/actions/event.actions';
import HomeClient from './HomeClient';

const HomeScreen = async () => {

  const events = await getEvents();
  console.log(events);
  


  
  return (
    
    <HomeClient initialEvents={events} />
    
  );
}

export default HomeScreen
