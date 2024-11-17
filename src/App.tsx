import { useState } from "react";
import CoreApp from "./components/CoreApp";
import LandingPage from "./components/LandingOrSignIn";
import './styles.css'
import { useSupabase } from "./SupaBaseContext";

export default function App() {


  const {supabase, session} = useSupabase()
  
  


  return (
    <>
      { session ? <CoreApp/> : <LandingPage/>}
    </>
    
  )
}
