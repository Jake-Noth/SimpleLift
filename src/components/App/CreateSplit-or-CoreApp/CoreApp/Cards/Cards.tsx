import Header from "./CardComponents/Header/Header"
import BottomAppBar from "./CardComponents/BottomAppBar"
import AddExercises from "./CardComponents/Add-Exercises/AddExercises"
import MyExercises from "./CardComponents/My-Exercises/MyExercises"
import { useGenerateCardProps } from "./CardComponents/useGenerateCardsProps"

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
        allExercisesInDB,
        exerciseDict,
        myExerciseHistory,
        getExerciseHistory,
        showAddLiftScreen,
        hideAddLiftScreen,
        previousDay,
        nextDay,
        fetchExercisesForDay,
        changeExerciseDict
    } = useGenerateCardProps(props.days, props.daysUUIDs);

    return(
        <>
            <Header day = {day} showSettings={props.showSettings}/>
            
            {liftScreen ? (
                <AddExercises
                    allExercisesInDB={allExercisesInDB}
                    UUID={UUID}
                    exerciseDict={exerciseDict}
                    myExerciseHistory = {myExerciseHistory}
                    getMyExerciseHistory = {getExerciseHistory}
                    hideLiftScreen={hideAddLiftScreen}
                    fetchExerciseForDay={fetchExercisesForDay}
                />
            ) : (
                <MyExercises
                    exerciseDict={exerciseDict}
                    UUID = {UUID}
                    changeExerciseDict = {changeExerciseDict}
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