interface NestedDict {
    [key: string]: any;
}

interface ExerciseDict {
    [key: string]: NestedDict;
}

interface MyExercisesProps {
    exerciseDict: ExerciseDict;
    UUID: string;
}

export default function MyExercises({ exerciseDict, UUID }: MyExercisesProps) {

    let exercisesArray: any[] = []

    if (exerciseDict && exerciseDict[UUID]) {
        const exercises = exerciseDict[UUID];
        exercisesArray = Object.keys(exercises);
    }

    return (
        <div className="exercises-container">
            {exercisesArray.map((item, index) => (
                <div id="add-exercise-exercise-container" key={index}>
                    {item}
                    
                </div>
            ))}
        </div>
    );
}
