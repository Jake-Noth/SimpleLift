import { useEffect, useState } from "react"
import { useSupabase } from "../../../../../../../useSupaBaseContext"


interface ExerciseHistory{
    data: { exercise_title: string }[];
}

interface NestedDict {
    [key: string]: any;
}

interface ExerciseDict {
    [key: string]: NestedDict;
}

export function useGenerateCardProps(days:string[], UUIDs:string[]){

    const [day, setDay] = useState<string>(days[0])
    const [UUID, setUUIDs] = useState<string>(UUIDs[0])
    const [showAddLiftScreen, setShowAddLiftScreen] = useState(false)
    const [allExercisesInDB, setAllExercisesInDB] = useState<string[]>([])
    const [exerciseDict, setExerciseDict] = useState<ExerciseDict>({})
    const [myExerciseHistory, setExerciseHistory] = useState<ExerciseHistory | null>(null);

    const {supabase, session} = useSupabase()

    const getAllExercisesInDB = async () =>{
        const {data, error} = await supabase
        .from('Exercise')
        .select('title')

        if(error){
            console.log("Failed to fetch all exercises")
        }

        const titles = data?.map((exercise) => exercise.title) || [];
        setAllExercisesInDB(titles);
    }

    const changeExerciseDict = (newDict: ExerciseDict) =>{
        setExerciseDict(newDict);
    } 

    const getExerciseHistory = async () => {
        
        const { error, data } = await supabase
            .from('MyExerciseHistory')
            .select('exercise_title')
            .eq('user_id', session?.user.id);
    
        if (error) {
            console.error('Error getting exercise history:', error);
        } else if (data) {
            setExerciseHistory({data});
        }
    };

    const fetchExercisesForDay = async (UUID: string) => {
    
        type MyExercise = {
            exercise_title: string;
        };
    
        const { error, data } = await supabase
            .from("MyCurrentExercise")
            .select("exercise_title")
            .eq("day_reference", UUID) as { data: MyExercise[] | null, error: any };
    
        if (error) {
            console.log("Failed to get exercise data");
        } else if (data) {
            const newUUIDDict: Record<string, true> = {};
    
            data.forEach((exercise) => {
                newUUIDDict[exercise.exercise_title] = true;
            });
    
            setExerciseDict((prev) => ({
                ...prev,
                [UUID]: newUUIDDict,
            }));
        }
    };

    useEffect(()=>{
        getAllExercisesInDB()
        getExerciseHistory()

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
        allExercisesInDB,
        exerciseDict,
        myExerciseHistory,
        getExerciseHistory,
        showAddLiftScreen:showAddLiftScreenHelper, 
        hideAddLiftScreen:hideAddLiftScreenHelper, 
        previousDay, 
        nextDay, 
        fetchExercisesForDay,
        changeExerciseDict
    }

}






