import React, { useState } from "react"
import SettingsPage from "./SettingsPage"
import Cards from "./Cards"


interface cardProps{
    days: string[]
}

export default function CoreApp({days}:cardProps){

    const [displayCoreApp, setDisplayCoreApp] = useState(true)

    return(
        <>
            {displayCoreApp ? <Cards split = {days} showSettings = {() => setDisplayCoreApp(false)}/>
            :
            <SettingsPage showCoreApp = {() => setDisplayCoreApp(true)}/> }
        </>
      
    )
}