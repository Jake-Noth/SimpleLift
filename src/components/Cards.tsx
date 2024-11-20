import { useState } from "react"
import Header from "./CardComponents/Header"
import BottomAppBar from "./CardComponents/BottomAppBar"
import AddExercises from "./CardComponents/AddExercises"
import MyExercises from "./CardComponents/MyExercises"
import { useGenerateCardProps } from "../CustomHooks/useGenerateCardsProps"

interface cardProps{
    showSettings: () => void
    split: string[]
}


export default function cards(props:cardProps){

    const {day, showSettings, showAddLiftScreen, setShowAddLiftScreen, previousDay, nextDay} = useGenerateCardProps(props);

    return(
        <>
            <Header day = {day} showSettings={showSettings}/>
            
            {showAddLiftScreen ? <AddExercises/>:<MyExercises/>}

            <BottomAppBar 
                showAddLiftScreen = {() => setShowAddLiftScreen(true)}
                hideAddLiftScreen = {() => setShowAddLiftScreen(false)}
                addLiftScreenBackButton = {showAddLiftScreen}
                nextDay = {() => nextDay()}
                prevDay = {() => previousDay()}
                />
        </>
    )
}