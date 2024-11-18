import React, { useState } from "react"
import SettingsPage from "./SettingsPage"


interface cardProps{
    days: string[]
}


export default function Card({days}:cardProps){

    const [day, setDay] = useState(days[0])
    const [settingsPage, setSettingsPage] = useState(false)
















    return(
        <>

            {settingsPage ? <SettingsPage setSettingsPage = {setSettingsPage} /> 
            :
                <>
                    <section className="header">
                    <h1>{day}</h1>
                    <button className="cogButton" onClick={()=>{setSettingsPage(true)}}></button>
                    </section>

                    <section className="cardBody">

                    </section>

                    <section className="buttonSection">

                    </section>
                </>
            }
            
        </>
    )
}