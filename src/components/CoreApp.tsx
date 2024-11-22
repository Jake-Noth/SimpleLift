import { useState } from "react"
import SettingsPage from "./SettingsPage"
import Cards from "./Cards"


interface cardProps{
    days: string[]
    daysUUIDs: string[]
}

export default function CoreApp(appProps:cardProps){

    const [displayCoreApp, setDisplayCoreApp] = useState(true)

    return(
        <>
            {displayCoreApp ? <Cards days = {appProps.days} daysUUIDs={appProps.daysUUIDs} showSettings = {() => setDisplayCoreApp(false)}/>
            :
            <SettingsPage showCoreApp = {() => setDisplayCoreApp(true)}/> }
        </>
      
    )
}