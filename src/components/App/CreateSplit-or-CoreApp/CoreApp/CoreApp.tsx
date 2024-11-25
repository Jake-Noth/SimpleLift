import { useState } from "react"
import SettingsPage from "./Cards/CardComponents/Header/SettingsPage"
import Cards from "./Cards/Cards"


interface cardProps{
    days: string[]
    daysUUIDs: string[]
    changeSplit: () => void
}

export default function CoreApp(appProps:cardProps){

    const [displayCoreApp, setDisplayCoreApp] = useState(true)

    return(
        <>
            {displayCoreApp ? <Cards days = {appProps.days} daysUUIDs={appProps.daysUUIDs} showSettings = {() => setDisplayCoreApp(false)} />
            :
            <SettingsPage showCoreApp = {() => setDisplayCoreApp(true)} changeSplit = {appProps.changeSplit}/> }
        </>
      
    )
}