import { useGenerateMyExercisesProps } from "./useGenerateMyExercisesProps";

interface NestedDict {
    [key: string]: any;
}

interface ExerciseDict {
    [key: string]: NestedDict;
}

interface MyExercisesProps {
    exerciseDict: ExerciseDict;
    UUID: string;
    changeExerciseDict: (newDict: ExerciseDict) => void;
    showExercise: (exercise: string) => void
}

export default function MyExercises({ exerciseDict, UUID, changeExerciseDict, showExercise }: MyExercisesProps) {
    const {
        showRemoveExercise,
        exercisesToRemove,
        exercisesArray,
        setShowRemoveExercises,
        handleExerciseChange,
        removeExercises,
        setExercisesToRemove
    } = useGenerateMyExercisesProps(UUID, exerciseDict, changeExerciseDict);

    return (
        <>
            {showRemoveExercise && (
                <div style={{ display: "flex", paddingLeft:"10px" }}>
                    Note: removing an exercise from your split will not erase its data
                </div>
            )} 
            <div className="exercises-container" >
                {exercisesArray.map((item, index) => (
                    <div
                        id="add-exercise-exercise-container"
                        key={index}
                        onClick={() => {
                            if (!showRemoveExercise) {
                                showExercise(item); // Only trigger if showRemoveExercise is false
                            }
                        }}
                        style={{ cursor: showRemoveExercise ? "default" : "pointer" }} // Optional: Adjust cursor for disabled state
                        >
                        {item}
                        {showRemoveExercise && (
                            <input
                                style={{ marginRight: "20px" }}
                                type="checkbox"
                                onChange={(event) => handleExerciseChange(event, item)}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {showRemoveExercise ? (
                    <>
                    <button
                        onContextMenu={(e) => e.preventDefault()} // Prevent right-click context menu
                        style={{
                            height: "40px", // Original height
                            marginLeft: "10px", // Original margin
                            backgroundColor: "#FFFFFF",
                            color: "Black",
                            border: ".5px solid black",
                            borderRadius: "8px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: "pointer",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "background-color 0.3s, transform 0.2s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "lightgrey")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        onClick={() => {
                            setShowRemoveExercises(false);
                            setExercisesToRemove([]);
                        }}
                    >
                        Hide Edit Exercises
                    </button>
                
                    <button
                        onContextMenu={(e) => e.preventDefault()} // Prevent right-click context menu
                        style={{
                            height: "40px", // Original height
                            marginRight: "10px", // Original margin
                            backgroundColor: exercisesToRemove.length === 0 ? "#E0E0E0" : "#FFFFFF", // Adjust background for disabled state
                            color: exercisesToRemove.length === 0 ? "#A0A0A0" : "Black", // Adjust text color for disabled state
                            border: ".5px solid black",
                            borderRadius: "8px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: exercisesToRemove.length === 0 ? "not-allowed" : "pointer", // Change cursor for disabled state
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "background-color 0.3s, transform 0.2s",
                        }}
                        onMouseOver={(e) => {
                            if (exercisesToRemove.length !== 0) {
                                e.currentTarget.style.backgroundColor = "lightgrey";
                            }
                        }}
                        onMouseOut={(e) => {
                            if (exercisesToRemove.length !== 0) {
                                e.currentTarget.style.backgroundColor = "white";
                            }
                        }}
                        onMouseDown={(e) => {
                            if (exercisesToRemove.length !== 0) {
                                e.currentTarget.style.transform = "scale(0.95)";
                            }
                        }}
                        onMouseUp={(e) => {
                            if (exercisesToRemove.length !== 0) {
                                e.currentTarget.style.transform = "scale(1)";
                            }
                        }}
                        disabled={exercisesToRemove.length === 0} // Original disabled condition
                        onClick={() => {
                            removeExercises();
                            setShowRemoveExercises(false);
                        }}
                    >
                        Remove
                    </button>
                </>
                ) : (
                    <button
                        onContextMenu={(e) => e.preventDefault()} // Prevent right-click context menu
                        style={{
                            height: "40px", // Original height
                            marginLeft: "10px", // Original margin
                            backgroundColor: "#FFFFFF",
                            color: "Black",
                            border: ".5px solid black",
                            borderRadius: "8px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: "pointer",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "background-color 0.3s, transform 0.2s",
                        }}
                        onClick={() => setShowRemoveExercises(true)} // Keep the original functionality
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "lightgrey")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        Edit Exercises
                    </button>
                    
                )}
            </div>
        </>
    );
}
