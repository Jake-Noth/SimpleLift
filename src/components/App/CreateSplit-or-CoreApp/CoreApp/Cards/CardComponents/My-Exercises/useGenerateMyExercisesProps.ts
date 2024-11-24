import { useEffect, useState } from "react";
import { useSupabase } from "../../../../../../../../useSupaBaseContext";

interface NestedDict {
    [key: string]: any;
}

interface ExerciseDict {
    [key: string]: NestedDict;
}

export function useGenerateMyExercisesProps(UUID: string, exerciseDict: ExerciseDict, changeExerciseDict: (newDict: ExerciseDict) => void) {
    const { supabase } = useSupabase();
    const [showRemoveExercise, setShowRemoveExercises] = useState(false);
    const [exercisesToRemove, setExercisesToRemove] = useState<string[]>([]);
    const [exercisesArray, setExercisesArray] = useState<string[]>([]);

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
                .eq("day_reference", UUID)
                .in("exercise_title", exercisesToRemove);

            if (error) {
                console.error("Error removing exercises:", error);
            } else {
                console.log("Successfully removed exercises:", data);

                // Update exerciseDict to exclude removed exercises
                const updatedDict = { ...exerciseDict };
                if (updatedDict[UUID]) {
                    updatedDict[UUID] = Object.fromEntries(
                        Object.entries(updatedDict[UUID]).filter(
                            ([exercise]) => !exercisesToRemove.includes(exercise)
                        )
                    );
                }
                changeExerciseDict(updatedDict);
                setExercisesToRemove([]);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    useEffect(() => {
        setShowRemoveExercises(false);
        setExercisesToRemove([]);
        setExercisesArray(exerciseDict[UUID] ? Object.keys(exerciseDict[UUID]) : []);
    }, [UUID, exerciseDict]);

    return {
        showRemoveExercise,
        exercisesToRemove,
        exercisesArray,
        setShowRemoveExercises,
        handleExerciseChange,
        removeExercises,
        setExercisesToRemove
    };
}
