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
            <div className="exercises-container">
                {filteredExercises.map((exercise, index) => (
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
                <button
                    onContextMenu={(e) => e.preventDefault()} // Prevent right-click context menu
                    style={{
                        backgroundColor: exercisesToBeAdded.length === 0 ? "#E0E0E0" : "#FFFFFF", // Light grey for disabled
                        color: exercisesToBeAdded.length === 0 ? "#A0A0A0" : "Black", // Grey text for disabled
                        border: ".5px solid black",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: exercisesToBeAdded.length === 0 ? "not-allowed" : "pointer", // Disabled cursor
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        transition: "background-color 0.3s, transform 0.2s",
                    }}
                    disabled={exercisesToBeAdded.length === 0} // Keep the original disabled logic
                    onMouseOver={(e) => {
                        if (exercisesToBeAdded.length !== 0) {
                            e.currentTarget.style.backgroundColor = "lightgrey";
                        }
                    }}
                    onMouseOut={(e) => {
                        if (exercisesToBeAdded.length !== 0) {
                            e.currentTarget.style.backgroundColor = "white";
                        }
                    }}
                    onMouseDown={(e) => {
                        if (exercisesToBeAdded.length !== 0) {
                            e.currentTarget.style.transform = "scale(0.95)";
                        }
                    }}
                    onMouseUp={(e) => {
                        if (exercisesToBeAdded.length !== 0) {
                            e.currentTarget.style.transform = "scale(1)";
                        }
                    }}
                    onClick={addExercisesToDay} // Original onClick functionality
                >
                    Add Exercises
                </button>
            </div>
        </>
    );
}
