

import { saveUser } from "@/actions/user.action";
import { prisma } from "@/lib/prisma";
import { montserrat } from "@/utils/fonts";
import { SignIn, useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";


import React, { useEffect } from 'react'

const AuthScreen = async () => {

  return (
    <div className='flex flex-row h-screen'>

        {/* One half for image */}
        <div className='relative w-1/2 h-full'>
             <Image src="/turf.jpg" alt="Bg image" fill className="object-cover blur-[0.75px] filter brightness-[0.8]"></Image>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                <h1 className={`${montserrat.className} text-white font-bold py-4 text-5xl`}>WELCOME TO SPORTIFY</h1> 
            </div>
            
        </div>

        {/* Other half for clerk provider */}
        <div className="relative w-1/2 h-full flex justify-center items-center">
            <SignIn>

            </SignIn>
        </div>
      
    </div>
  )
}

export default AuthScreen
