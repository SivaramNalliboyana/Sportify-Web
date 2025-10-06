import "react-datepicker/dist/react-datepicker.css";

import AuthScreen from "@/components/AuthSection/auth_screen";
import HomeScreen from "@/components/HomeScreen";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {  
 
    
  return (
    

    <HomeScreen />
  );
}
