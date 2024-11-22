import { useEffect, useState } from "react"
import { useSupabase } from "./useSupaBaseContext"

export function useGenerateCardProps(days:string[], dayUUIDs:string[]){

    const [day, setDay] = useState<string>(days[0])
    const [dayUUID, setDayUUID] = useState<string>(dayUUIDs[0])
    const [showAddLiftScreen, setShowAddLiftScreen] = useState(false)
    const [allExercises, setAllExercises] = useState<null | string[]>(null)

    const {supabase} = useSupabase()

    const getAllExercises = async () =>{
        const {data, error} = await supabase
        .from('Exercise')
        .select('title')

        if(error){
            console.log("Failed to fetch all exercises")
        }

        const titles = data?.map((exercise) => exercise.title) || [];
        setAllExercises(titles);
    }

    useEffect(()=>{
        getAllExercises()
    },[])
    
    const previousDay = () => {
        let cur = days.indexOf(day);
        cur = cur - 1 < 0 ? days.length - 1 : cur - 1;
        setDay(days[cur]);
        setDayUUID(dayUUIDs[cur])
        setShowAddLiftScreen(false);
    };
    
    const nextDay = () => {
        let cur = days.indexOf(day);
        cur = (cur + 1) % days.length;
        setDay(days[cur]);
        setDayUUID(dayUUIDs[cur])
        setShowAddLiftScreen(false);
    };


    return {day, dayUUID, showAddLiftScreen, setShowAddLiftScreen, previousDay, nextDay, allExercises}
}






