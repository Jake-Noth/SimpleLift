import { useEffect, useState } from "react"
import { useSupabase } from "./useSupaBaseContext"

export function useGenerateCardProps(days:string[], UUIDs:string[]){

    const [day, setDay] = useState<string>(days[0])
    const [UUID, setUUIDs] = useState<string>(UUIDs[0])
    const [showAddLiftScreen, setShowAddLiftScreen] = useState(false)
    const [allExercises, setAllExercises] = useState<null | string[]>(null)
    const [exerciseDict, setExerciseDict] = useState({})

    const {supabase} = useSupabase()

    const getAllExercises = async () =>{
        console.log('fired')
        const {data, error} = await supabase
        .from('Exercise')
        .select('title')

        if(error){
            console.log("Failed to fetch all exercises")
        }

        const titles = data?.map((exercise) => exercise.title) || [];
        setAllExercises(titles);
    }

    const fetchExercisesForDay = async (UUID:string) =>{

        console.log(UUID)
        const {error, data} = await supabase.from("MyExercise").select("exercise_title").eq("day_reference",UUID)

        if(error){
            console.log("Failed to get exercise data")
        }else{
            
            data.map(exercise => {
                setExerciseDict(prev => ({
                    ...prev,
                    [UUID]:exercise.exercise_title
                }))
            })
        }
    }

    useEffect(()=>{
        getAllExercises()

        for(const UUID of UUIDs){
            fetchExercisesForDay(UUID)
        }

    },[])
    
    const previousDay = () => {
        let cur = days.indexOf(day);
        cur = cur - 1 < 0 ? days.length - 1 : cur - 1;
        setDay(days[cur]);
        setUUIDs(UUIDs[cur])
        setShowAddLiftScreen(false);
    };
    
    const nextDay = () => {
        let cur = days.indexOf(day);
        cur = (cur + 1) % days.length;
        setDay(days[cur]);
        setUUIDs(UUIDs[cur])
        setShowAddLiftScreen(false);
    };

    const showAddLiftScreenHelper = () => setShowAddLiftScreen(true)
    const hideAddLiftScreenHelper = () => setShowAddLiftScreen(false)


    return {
        day, 
        UUID,
        liftScreen:showAddLiftScreen,
        allExercises,
        exerciseDict,
        showAddLiftScreen:showAddLiftScreenHelper, 
        hideAddLiftScreen:hideAddLiftScreenHelper, 
        previousDay, 
        nextDay, 
        fetchExercisesForDay
    }

}






