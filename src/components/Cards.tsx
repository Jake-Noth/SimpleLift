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

    const {
        day,
        UUID,
        liftScreen,
        allExercises,
        exerciseDict,
        showAddLiftScreen,
        hideAddLiftScreen,
        previousDay,
        nextDay,
        fetchExercisesForDay
    } = useGenerateCardProps(props.days, props.daysUUIDs);

    return(
        <>
            <Header day = {day} showSettings={props.showSettings}/>
            
            {liftScreen ? (
                <AddExercises
                    allExercises={allExercises}
                    UUID={UUID}
                    exerciseDict={exerciseDict}
                    hideLiftScreen={hideAddLiftScreen}
                    fetchExerciseForDay={fetchExercisesForDay}
                />
            ) : (
                <MyExercises
                    exerciseDict={exerciseDict}
                />
            )}


            <BottomAppBar 
                showAddLiftScreen = {showAddLiftScreen}
                hideAddLiftScreen = {hideAddLiftScreen}
                addLiftScreenBackButton = {liftScreen}
                nextDay = {nextDay}
                prevDay = {previousDay}
                />
        </>
    )
}