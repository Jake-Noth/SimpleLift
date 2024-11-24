import { useState } from "react";
import { useSupabase } from "../../../../../../../../useSupaBaseContext";

interface NestedDict {
    [key: string]: any;
}

interface ExerciseDict {
    [key: string]: NestedDict;
}

interface ExerciseHistory {
    data: { exercise_title: string }[];
}

interface UseAddExerciseHelperProps {
    allExercisesInDB: string[];
    UUID: string;
    exerciseDict: ExerciseDict;
    myExerciseHistory: ExerciseHistory | null;
    getMyExerciseHistory: () => void;
    fetchExerciseForDay: (UUID: string) => Promise<void>;
    hideLiftScreen: () => void;
}

export default function useAddExerciseHelper({
    allExercisesInDB,
    UUID,
    exerciseDict,
    myExerciseHistory,
    getMyExerciseHistory,
    fetchExerciseForDay,
    hideLiftScreen,
}: UseAddExerciseHelperProps) {
    const [exercisesToBeAdded, setExercisesToBeAdded] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
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

    const updateExerciseHistory = async (exercisesData: any[]) => {
        try {
            const userId = session?.user.id;
            if (!userId || !exercisesData || exercisesData.length === 0) {
                console.warn("No user ID or exercises data provided.");
                return;
            }
    
            const formattedExercises = exercisesData.map((exercise) => ({
                user_id: userId,
                exercise_title: exercise.exercise_title,
            }));
    
            const newExercises = formattedExercises.filter(
                (exercise) =>
                    !myExerciseHistory?.data.some(
                        (history) => history.exercise_title === exercise.exercise_title
                    )
            );
    
            if (newExercises.length === 0) {
                console.log("No new exercises to add to history.");
                return;
            }
    
            const { data, error } = await supabase
                .from("MyExerciseHistory")
                .insert(newExercises);
    
            if (error) {
                console.error("Error inserting into MyExerciseHistory:", error.message);
            } else {
                console.log("Successfully updated exercise history:", data);
            }
        } catch (error) {
            console.error("Error in updateExerciseHistory:", error);
        }
    };

    const addExercisesToDay = async () => {
        const id = session?.user.id;

        const exercisesData = exercisesToBeAdded.map((exercise) => ({
            exercise_title: exercise,
            day_reference: UUID,
            user_id: id,
        }));

        updateExerciseHistory(exercisesData);

        const { data, error } = await supabase.from("MyCurrentExercise").insert(exercisesData);

        if (error) {
            console.error("Error inserting exercises:", error.message);
        } else {
            console.log("Successfully added exercises:", data);
            fetchExerciseForDay(UUID);
            setExercisesToBeAdded([]);
            getMyExerciseHistory();
            hideLiftScreen();
        }
    };

    const exerciseNotAlreadyBeingUsed = removeDays();

    // Filter exercises based on search term
    const filteredExercises = exerciseNotAlreadyBeingUsed.filter((exercise) =>
        exercise.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        exercisesToBeAdded,
        exerciseNotAlreadyBeingUsed, // Original array
        filteredExercises,          // Filtered array
        searchTerm,                 // Search term
        setSearchTerm,              // Setter for search term
        manageCheckBox,
        addExercisesToDay,
    };
}
