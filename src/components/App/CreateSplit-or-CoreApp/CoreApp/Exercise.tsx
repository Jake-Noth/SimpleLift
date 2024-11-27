import { useState } from "react"

interface ExerciseProps {
    exercise: string
}

interface RepXWeight {
    reps: number;
    weight: number;
}



export default function Exercise({exercise}:ExerciseProps){

    const [sets, setSets] = useState<RepXWeight[]>([{} as RepXWeight]);

    const divWidth = 100/sets.length;


    const addSet = () =>{
        const newSet = {} as RepXWeight
        setSets(old => [...old, newSet])
    }

    const removeSet = () =>{
        const array = [...sets]
        array.pop()
        setSets(array)
    }

    return (
    <div style={{height:"100%"}}>
        <header id='header-container'>
            <label id="day-label-container" style={{fontWeight:"bold", textTransform:"uppercase"}}>{exercise}</label>
        </header>
        <section className="exercise-graph-container">

            <div id="graph-container">

            </div>

            <div id="sessions-container" >
                <div id="previous-sessions-container">

                </div>

                <div id="new-session-container">

                    <div style={{width:"90%", display:"flex", flexDirection:"row"}}>
                    {sets.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                flex: 1, 
                                borderRight: "2px solid black",
                                maxWidth:"25%"
                            }}
                        >
                            <div style={{width:"100%", height:"10%"}}>
                                Set {index + 1}
                            </div>
                            
                            <div style={{display:"flex", width:"100%", height:"90%", alignItems:"center"}}>
                                <input placeholder="reps" style={{width:"49%", marginTop:"10%", marginLeft:"10%", marginBottom:"10%", marginRight:"5%"}}/>
                                <div style={{display:"flex", alignItems:"center"}}>:</div>
                                <input placeholder="weight" style={{width:"49%", marginTop:"10%", marginRight:"10%", marginBottom:"10%", marginLeft:"5%"}}/>
                            </div>
                        </div>
                    ))}
                    </div>


                    <div style={{width:"10%", borderLeft:"2px solid black"}}>
                        <div style={{width:"100%", height:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <button id="add-set-button" onClick={addSet}/>
                        </div>

                        <div style={{width:"100%", height:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <button id="remove-set-button" onClick={removeSet}/>
                        </div>
                    </div>
                    
                </div>

            </div>

        </section>
        
    </div>
    )
}