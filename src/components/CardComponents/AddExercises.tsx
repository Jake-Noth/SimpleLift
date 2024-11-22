import { useEffect, useState, useRef } from "react";
import ExerciseOfAddExercise from "./ExerciseOfAddExercise";
import { useSupabase } from "../../CustomHooks/useSupaBaseContext";

interface AddExercisesProps {
    allExercises: string[] | null;
    UUID: string;
    hideLiftScreen: () => void;
}

export default function AddExercises({ allExercises, UUID, hideLiftScreen }: AddExercisesProps) {
    const [iterations, setIterations] = useState(0);
    const [exerciseToBeRendered, setExercisesToBeRendered] = useState<string[]>([]);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [exercisesToBeAdded, setExercisesToBeAdded] = useState<string[]>([]);
    const {supabase, session} = useSupabase()

    const generateExercises = () => {
        if (!allExercises) return;

        const start = iterations * 5;
        const end = start + 5;

        const newExercises = allExercises.slice(start, end);
        setExercisesToBeRendered((prev) => [...prev, ...newExercises]);
        setIterations((prev) => prev + 1);
        console.log('loaded more')
    };

    const manageCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
        const newArray = [...exercisesToBeAdded];
        newArray.push(event.target.id);
        setExercisesToBeAdded(newArray);
        } else {
        const newArray = exercisesToBeAdded.filter(id => id !== event.target.id);
        setExercisesToBeAdded(newArray);
        }
    };

    const addExercisesToDay = async () =>{

        const id = session?.user.id

        const exercisesData = exercisesToBeAdded.map(exercise => ({
            exercise_title: exercise,
            day_reference: UUID,
            user_id: id
        }));

        const { data, error } = await supabase.from("MyExercise").insert(exercisesData);

        if (error) {
            console.error("Error inserting exercises:", error.message);
        } else {
            console.log("Successfully added exercises:", data);
            setExercisesToBeAdded([]);
            hideLiftScreen()
        }
    }

    useEffect(() => {
        if (allExercises && allExercises.length > 0) {
            generateExercises();
        }
    }, [allExercises]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                generateExercises();
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [iterations, allExercises]);

    return (

        <>
            <div>
                Select Exercises you want to add to this day
            </div>
            <div id="add-exercises-container">
                {exerciseToBeRendered.map((exercise, index) => (
                    <div id='add-exercise-exercise-container' key={index}>
                        <ExerciseOfAddExercise exercise={exercise} checkBoxHelper = {manageCheckBox}/>
                    </div>
                ))}
                {allExercises && iterations * 5 < allExercises.length && (
                    <div ref={loaderRef} style={{ height: "50px", textAlign: "center" }}>
                        Loading more exercises...
                    </div>
                )}
            </div>
            <div style={{display:"flex", justifyContent:"end", paddingTop:"5px", paddingRight:"5px", paddingBottom:"5px"}}>
                <button disabled={exercisesToBeAdded.length == 0} onClick={addExercisesToDay}>Add Exercises</button>
            </div>
        </>
        
    );
}
