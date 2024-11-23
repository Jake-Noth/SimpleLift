import useAddExerciseHelper from "./useAddExerciseHelper";
import ExerciseOfAddExercise from "./ExerciseOfAddExercise";

interface AddExercisesProps {
    allExercisesInDB: string[];
    UUID: string;
    hideLiftScreen: () => void;
    fetchExerciseForDay: (UUID: string) => Promise<void>;
    exerciseDict: { [key: string]: any };
}

export default function AddExercises({
    allExercisesInDB,
    UUID,
    hideLiftScreen,
    fetchExerciseForDay,
    exerciseDict,
}: AddExercisesProps) {
    const {
        exercisesToBeAdded,
        exerciseNotAlreadyBeingUsed,
        manageCheckBox,
        addExercisesToDay,
    } = useAddExerciseHelper({
        allExercisesInDB,
        UUID,
        exerciseDict,
        fetchExerciseForDay,
        hideLiftScreen,
    });

    return (
        <>
            <div>Select Exercises you want to add to this day</div>
            <div id="add-exercises-container">
                {exerciseNotAlreadyBeingUsed.map((exercise, index) => (
                    <div id="add-exercise-exercise-container" key={index}>
                        <ExerciseOfAddExercise exercise={exercise} checkBoxHelper={manageCheckBox} />
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    paddingTop: "5px",
                    paddingRight: "5px",
                    paddingBottom: "5px",
                }}
            >
                <button disabled={exercisesToBeAdded.length === 0} onClick={addExercisesToDay}>
                    Add Exercises
                </button>
            </div>
        </>
    );
}
