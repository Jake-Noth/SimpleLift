import { useEffect, useState, useRef } from "react";

interface AddExercisesProps {
    allExercises: string[] | null; // Array of exercises or null
}

export default function AddExercises({ allExercises }: AddExercisesProps) {
    const [iterations, setIterations] = useState(0);
    const [exerciseToBeRendered, setExercisesToBeRendered] = useState<string[]>([]);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const generateExercises = () => {
        if (!allExercises) return;

        const start = iterations * 5; // Start index for the next batch
        const end = start + 5; // End index for the next batch

        const newExercises = allExercises.slice(start, end); // Extract the next 5 exercises
        setExercisesToBeRendered((prev) => [...prev, ...newExercises]);
        setIterations((prev) => prev + 1); // Increment iterations
        console.log('loaded more')
    };

    useEffect(() => {
        if (allExercises && allExercises.length > 0) {
            generateExercises(); // Initial load
        }
    }, [allExercises]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                generateExercises(); // Load the next batch when the loader comes into view
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [iterations, allExercises]);

    return (
        <div id="add-exercises-container">
            {exerciseToBeRendered.map((exercise, index) => (
                <div id='add-exercise-exercise-container' key={index}>{exercise}</div>
            ))}
            {allExercises && iterations * 5 < allExercises.length && (
                <div ref={loaderRef} style={{ height: "50px", textAlign: "center" }}>
                    Loading more exercises...
                </div>
            )}
        </div>
    );
}
