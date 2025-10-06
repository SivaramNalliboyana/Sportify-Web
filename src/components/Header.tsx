
import { montserrat } from "@/utils/fonts";
import Image from "next/image";

import React from 'react'



const Header = ({showText}:{showText:boolean}) => {
  return (
    <div className='relative w-full h-28'>
       <Image src="/turf.jpg" alt="Bg image" fill className="object-cover blur-[0.75px] filter brightness-[0.7]"/>

       {showText && (<h1 className={`${montserrat.className} absolute text-white font-bold text-4xl pt-8 pl-5`}>SPORTIFY</h1>)}
       
    </div>
  )
}

export default Header
