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
                    <div id="add-exercise-exercise-container" key={index} onClick={() => showExercise(item)}>
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
                            style={{ height: "20px", marginLeft: "10px" }}
                            onClick={() => {
                                setShowRemoveExercises(false);
                                setExercisesToRemove([]);
                            }}
                        >
                            Hide Edit Exercises
                        </button>
                        <button
                            style={{ height: "20px", marginRight: "10px" }}
                            disabled={exercisesToRemove.length === 0}
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
                        style={{ height: "20px", marginLeft: "10px" }}
                        onClick={() => setShowRemoveExercises(true)}
                    >
                        Edit Exercises
                    </button>
                )}
            </div>
        </>
    );
}
