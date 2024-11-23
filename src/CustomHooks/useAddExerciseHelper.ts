import { useState } from "react";
import { useSupabase } from "./useSupaBaseContext";

interface NestedDict {
    [key: string]: any;
}

interface ExerciseDict {
    [key: string]: NestedDict;
}

interface UseAddExerciseHelperProps {
    allExercisesInDB: string[];
    UUID: string;
    exerciseDict: ExerciseDict;
    fetchExerciseForDay: (UUID: string) => Promise<void>;
    hideLiftScreen: () => void;
}

export default function useAddExerciseHelper({
    allExercisesInDB,
    UUID,
    exerciseDict,
    fetchExerciseForDay,
    hideLiftScreen,
}: UseAddExerciseHelperProps) {
    const [exercisesToBeAdded, setExercisesToBeAdded] = useState<string[]>([]);
    const { supabase, session } = useSupabase();

    const removeDays = () => {
        const userExercises = exerciseDict[UUID] || {};
        const tempArray = [...allExercisesInDB];
        return tempArray.filter((exercise) => !Object.keys(userExercises).includes(exercise));
    };

    const manageCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setExercisesToBeAdded((prev) => [...prev, event.target.id]);
        } else {
            setExercisesToBeAdded((prev) => prev.filter((id) => id !== event.target.id));
        }
    };

    const addExercisesToDay = async () => {
        const id = session?.user.id;

        const exercisesData = exercisesToBeAdded.map((exercise) => ({
            exercise_title: exercise,
            day_reference: UUID,
            user_id: id,
        }));

        const { data, error } = await supabase.from("MyExercise").insert(exercisesData);

        if (error) {
            console.error("Error inserting exercises:", error.message);
        } else {
            console.log("Successfully added exercises:", data);
            fetchExerciseForDay(UUID);
            setExercisesToBeAdded([]);
            hideLiftScreen();
        }
    };

    const exerciseNotAlreadyBeingUsed = removeDays();

    return {
        exercisesToBeAdded,
        exerciseNotAlreadyBeingUsed,
        manageCheckBox,
        addExercisesToDay,
    };
}
