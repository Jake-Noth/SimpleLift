import { useEffect, useState } from "react";
import { useSupabase } from "../../../../../../../useSupaBaseContext";

interface NestedDict {
    [key: string]: any;
}

interface ExerciseDict {
    [key: string]: NestedDict;
}

interface MyExercisesProps {
    exerciseDict: ExerciseDict;
    UUID: string;
    day: string;
    fetchExerciseForDay: (UUID: string) => Promise<void>
}

export default function MyExercises({ exerciseDict, UUID, day, fetchExerciseForDay }: MyExercisesProps) {

    const {supabase} = useSupabase()
    const [showRemoveExercise, setShowRemoveExercises] = useState(false);
    const [exercisesToRemove, setExercisesToRemove] = useState<string[]>([]);

    const handleExerciseChange = (event: React.ChangeEvent<HTMLInputElement>, exercise: string) => {
        if (event.target.checked) {
            
            setExercisesToRemove((prev) => [...prev, exercise]);
        } else {
            
            setExercisesToRemove((prev) => prev.filter((ex) => ex !== exercise));
        }
    };


    const removeExercises = async () => {
        if (exercisesToRemove.length === 0) {
            console.log("No exercises selected for removal.");
            return;
        }
    
        try {

            const { error, data } = await supabase
                .from("MyCurrentExercise")
                .delete()
                .eq('day_reference', UUID) // Match the day_reference
                .in('exercise_title', exercisesToRemove); // Match exercise_title within the array
            
            if (error) {
                console.error("Error removing exercises:", error);
            } else {
                console.log("Successfully removed exercises:", data);
                setExercisesToRemove([]);
                fetchExerciseForDay(UUID)
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    let exercisesArray: any[] = [];

    if (exerciseDict && exerciseDict[UUID]) {
        const exercises = exerciseDict[UUID];
        exercisesArray = Object.keys(exercises);
    }

    useEffect(()=>{
        setShowRemoveExercises(false)
        setExercisesToRemove([])
    },[UUID])

    return (
        <>
            {showRemoveExercise && <>Note: removing an exercise from your split will not erase its data</>}
            <div className="exercises-container">
                {exercisesArray.map((item, index) => (
                    <div id="add-exercise-exercise-container" key={index}>
                        {item}
                        {showRemoveExercise && (
                            <input
                                style={{marginRight:"20px"}}
                                type="checkbox"
                                onChange={(event) => handleExerciseChange(event, item)} // Correctly passing event and exercise
                            />
                        )}
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {
                    showRemoveExercise 
                    ? 
                    <>
                        <button style={{ height: '20px', marginLeft: "10px" }} onClick={() => {
                            setShowRemoveExercises(false);
                            setExercisesToRemove([]);
                        }}>Hide Edit Exercises</button> 
                        <button style={{ height: '20px', marginRight: "10px" }} disabled={exercisesToRemove.length == 0} onClick={()=>{removeExercises(); setShowRemoveExercises(false)}}>Remove</button>
                        
                    </>
                    
                    : <button style={{ height: '20px', marginLeft: "10px" }} onClick={() => setShowRemoveExercises(true)}>Edit Exercises</button>
                }
            </div>
        </>
    );
}
