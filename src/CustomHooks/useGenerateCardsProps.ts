import { useEffect, useState } from "react"
import { useSupabase } from "./useSupaBaseContext"


interface cardProps{
    showSettings: () => void
    split: string[]
}

export function useGenerateCardProps({showSettings, split}:cardProps){

    const [day, setDay] = useState(split[0])
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
        let cur = split.indexOf(day);
        cur = cur - 1 < 0 ? split.length - 1 : cur - 1;
        setDay(split[cur]);
        setShowAddLiftScreen(false);
    };
    
    const nextDay = () => {
        let cur = split.indexOf(day);
        cur = (cur + 1) % split.length;
        setDay(split[cur]);
        setShowAddLiftScreen(false);
    };


    return {day, showSettings, showAddLiftScreen, setShowAddLiftScreen, previousDay, nextDay, allExercises}
}






