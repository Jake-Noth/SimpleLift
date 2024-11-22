import Header from "./CardComponents/Header"
import BottomAppBar from "./CardComponents/BottomAppBar"
import AddExercises from "./CardComponents/AddExercises"
import MyExercises from "./CardComponents/MyExercises"
import { useGenerateCardProps } from "../CustomHooks/useGenerateCardsProps"

interface cardProps{
    days: string[]
    daysUUIDs: string[]
    showSettings: () => void
}


export default function cards(props:cardProps){

    const {day, dayUUID, showAddLiftScreen, setShowAddLiftScreen, previousDay, nextDay, allExercises} = useGenerateCardProps(props.days, props.daysUUIDs);

    const hideLiftScreen = () => setShowAddLiftScreen(false)

    console.log(dayUUID)
    return(
        <>
            <Header day = {day} showSettings={props.showSettings}/>
            
            {showAddLiftScreen ? <AddExercises allExercises = {allExercises} UUID = {dayUUID} hideLiftScreen = {hideLiftScreen} />:<MyExercises/>}

            <BottomAppBar 
                showAddLiftScreen = {() => setShowAddLiftScreen(true)}
                hideAddLiftScreen = {hideLiftScreen}
                addLiftScreenBackButton = {showAddLiftScreen}
                nextDay = {() => nextDay()}
                prevDay = {() => previousDay()}
                />
        </>
    )
}