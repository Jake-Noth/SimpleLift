interface MyExercisesProps {
    exerciseDict: object;
}

export default function MyExercises({ exerciseDict }: MyExercisesProps) {
    return (
        <div id="my-exercises-container">
            My exercises
        </div>
    );
}
