import { create } from "zustand";

type AddEventStore = {
    isOpen: boolean;
    open: ()=> void;
    close: ()=> void;
    image: File | null,
    date: Date | null,
    city: string,
    sport: string,
    title: string,
    isPosting: boolean,
    setimage: (img: File | null)=> void,
    setDate: (date: Date | null) => void,
    setCity: (city: string) => void,
    setSport: (sport: string)=> void, 
    setTitle: (title: string)=> void,
    setisPosting: (status: boolean)=> void,
    clearState: ()=> void,

}

export const useAddEventStore = create<AddEventStore>((set)=> ({
    isOpen: false,
    open: ()=> {
        set(({isOpen: true}))
    },
    close: ()=> {
        set(({isOpen: false}))
    },
    image: null,
    date: null,
    city: "Dortmund",
    sport: "",
    title: "",
    isPosting: false,
    setimage: (img) => {
        set(({image: img}))
    },
    setDate: (dt) => {
        set(({date:dt}))
    },
    setCity: (cty) => {
        set(({city:cty}))
    },
    setSport: (spt) => {
        set(({sport:spt}))
    },
    setTitle: (titl) => {
        set(({title:titl}))
    },
    setisPosting: (status) => {
        set(({isPosting: status}))
    },
    clearState: ()=>{
        set(({city: "", image: null,date: null,sport: "", title: "", isPosting: false}))
    }

}));