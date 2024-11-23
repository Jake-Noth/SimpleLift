
interface exerciseProps {
    exercise: string;
    checkBoxHelper: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ExerciseOfAddExercise({exercise, checkBoxHelper}:exerciseProps){

    return(
        <>
            <div style={{display:"flex", alignItems:"center", height:"100%", width:"80%"}}>
                {exercise}
            </div>
            
            <div style={{display:"flex", height:"100%",justifyContent:"center", width:"20%", alignItems:"center"}}>
                <input type="checkbox" id={exercise} onChange={checkBoxHelper}/>
            </div>
            
        </>
    )
}