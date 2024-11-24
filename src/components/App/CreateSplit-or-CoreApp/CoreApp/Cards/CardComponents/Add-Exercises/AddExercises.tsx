import ExerciseOfAddExercise from "./ExerciseOfAddExercise";
import useAddExerciseHelper from "./useAddExerciseHelper";

interface ExerciseHistory {
    data: { exercise_title: string }[];
}

interface AddExercisesProps {
    allExercisesInDB: string[];
    UUID: string;
    myExerciseHistory: ExerciseHistory | null;
    hideLiftScreen: () => void;
    fetchExerciseForDay: (UUID: string) => Promise<void>;
    getMyExerciseHistory: () => void;
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
        filteredExercises, // Use filtered array
        searchTerm,
        setSearchTerm,
        manageCheckBox,
        addExercisesToDay,
    } = useAddExerciseHelper({
        allExercisesInDB,
        UUID,
        exerciseDict,
        myExerciseHistory,
        fetchExerciseForDay,
        hideLiftScreen,
        getMyExerciseHistory,
    });

    return (
        <>
            <div style={{ borderBottom: "1px solid black", paddingLeft: "10px" }}>
                Select Exercises you want to add to this day
            </div>

            {/* Search Input */}
            <div>
                <input
                    type="text"
                    placeholder="Search exercises"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            {/* Exercises List */}
            <div className="exercises-container">
                {filteredExercises.map((exercise, index) => (
                    <div id="add-exercise-exercise-container" key={index}>
                        <ExerciseOfAddExercise exercise={exercise} checkBoxHelper={manageCheckBox} />
                    </div>
                ))}
            </div>

            {/* Add Button */}
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
