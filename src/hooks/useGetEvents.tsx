import { SportEvent } from "@/components/SportCardsSection/sport_card"
import { Event } from "@/generated/prisma"
import { create } from "zustand"

type getEventsProps = {
    eventsList: SportEvent[],
    setEvents: (e: SportEvent[])=> void
}

export const usegetEventStore =  create<getEventsProps>((set)=>({
    eventsList: [],
    setEvents: (e)=> {
        set(({eventsList:e}))
    }
}))