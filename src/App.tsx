import { useState } from "react";

import CoreApp from "./components/CoreApp";
import LandingPage from "./components/LandingOrSignIn";

export default function App() {


  const [session, setSession] = useState(null)
  


  return (
    <>
      {session ? <CoreApp setSession ={setSession} /> : <LandingPage setSession ={setSession} />}
    </>
    
  )
}
