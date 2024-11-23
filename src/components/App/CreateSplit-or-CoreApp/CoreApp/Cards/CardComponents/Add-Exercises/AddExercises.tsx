import useAddExerciseHelper from "./useAddExerciseHelper";
import ExerciseOfAddExercise from "./ExerciseOfAddExercise";

interface ExerciseHistory{
    data: { exercise_title: string }[];
}

interface AddExercisesProps {
    allExercisesInDB: string[];
    UUID: string;
    myExerciseHistory: ExerciseHistory | null
    hideLiftScreen: () => void;
    fetchExerciseForDay: (UUID: string) => Promise<void>;
    getMyExerciseHistory: () => void
    exerciseDict: { [key: string]: any };
}

export default function AddExercises({
    allExercisesInDB,
    UUID,
    hideLiftScreen,
    fetchExerciseForDay,
    getMyExerciseHistory,
    exerciseDict,
    myExerciseHistory,
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
        myExerciseHistory,
        fetchExerciseForDay,
        hideLiftScreen,
        getMyExerciseHistory
    });

    return (
        <>
            <div>Select Exercises you want to add to this day</div>
            <div className="exercises-container">
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
