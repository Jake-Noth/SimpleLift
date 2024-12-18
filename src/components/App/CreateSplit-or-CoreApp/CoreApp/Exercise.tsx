import { useEffect, useState } from "react"
import { useSupabase } from "../../../../../useSupaBaseContext";
import { ExerciseState } from "./ExerciseState";

interface ExerciseProps {
    exercisePassed: string
    showCards: () => void
    exerciseState: ExerciseState
}

export default function Exercise({exercisePassed, showCards, exerciseState}:ExerciseProps){

    const exercise = exerciseState.hasPreviousState() ? exerciseState.getExercise() : exercisePassed
    const [sets, setSets] = useState<number[]>([1]);
    const [sessionReps, setSessionReps] = useState<{ [key: number]: number }>({});
    const [sessionWeights, setSessionWeights] = useState<{ [key: number]: number }>({});
    const [missingFromReps, setMissingFromReps] = useState<{ [key: number]: null }>({});
    const [missingFromWeight, setMissingFromWeight] = useState<{ [key: number]: null }>({});
    const [exerciseInstance, setExerciseInstance] = useState(1);
    const [previousSessions, setPreviousSessions] = useState<{ set: any; weight: any; reps: any; }[][]>([])
    const [date, setDate] = useState<{ instance: any; session_id: any; date_created: any; }[]>([])

    const {supabase, session} = useSupabase()

    const addSet = () => {

        const result = [...sets, sets.length + 1]
        exerciseState.setSets(result)
        setSets(result);
    };

    const removeSet = () => {

        if(sets.length > 1){
            const new_reps = { ...sessionReps };
            const new_weights = { ...sessionWeights };
        
            const index = sets.length - 1;
        
            delete new_reps[index];
            delete new_weights[index];

            updateMissingReps(index)
            updateMissingWeight(index)
        
            setSessionReps(new_reps);
            setSessionWeights(new_weights);
            
            const result = sets.slice(0, -1)
            exerciseState.setSets(result)
            setSets(result);
        }
        
    };

    const updateSessionReps = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {

        if(event.target.value){
            const newReps = { ...sessionReps };
            newReps[index] = parseInt(event.target.value, 10)
            setSessionReps(newReps);
            exerciseState.setSessionReps(newReps)
            updateMissingReps(index)
        }
        else{
            const newReps = { ...sessionReps};
            delete newReps[index]
            exerciseState.setSessionReps(newReps)
            setSessionReps(newReps)
        }

    };

    const updateSessionWeights = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        if(event.target.value){
            const newWeights = { ...sessionWeights };
            newWeights[index] = parseInt(event.target.value, 10)
            exerciseState.setSessionWeights(newWeights)
            setSessionWeights(newWeights);

            updateMissingWeight(index)

        }else{
            const newWeights = { ...sessionWeights };
            delete newWeights[index]
            exerciseState.setSessionWeights(newWeights)

            setSessionWeights(newWeights);
        }
        
        
    };
    const updateMissingReps = (index:number) =>{
        const newMissingReps = {...missingFromReps}
            index in newMissingReps ? delete newMissingReps[index] : null
            setMissingFromReps(newMissingReps)
    }

    const updateMissingWeight = (index:number) =>{

        const newMissingWeight = {...missingFromWeight}
            index in newMissingWeight ? delete newMissingWeight[index] : null
            setMissingFromWeight(newMissingWeight)
    }

    const uploadDataToSupaBase = async () => {

        const { error, data } = await supabase
        .from('Exercise_session')
        .insert([
          {
            exercise: exercise,
            date_created: new Date,
            instance: exerciseInstance
          }
        ])
        .select('session_id')
        .single();

      if (error) {
        console.error('Error inserting data:', error.message);
        return;
      }

      for(let i =0; i< Object.keys(sessionReps).length;i++){
        
            const { error} = await supabase
            .from('sets')
            .insert([
                {
                    session_id: data.session_id,
                    set: i+1,
                    weight: sessionWeights[i],
                    reps: sessionReps[i]
                }
            ])

            if (error) {
                console.error('Error inserting set:', error.message);
                return;
            }
      }
    }

    const get_and_set_exercise_instance = async () => {
        const { data, error } = await supabase
        .from('Exercise_session')
        .select('instance, session_id, date_created')
        .eq('user_id', session?.user?.id)
        .eq('exercise', exercise)
        .order('instance', { ascending: false })
        
        if (error) {
        console.error('Error fetching the greatest instance:', error);
        } else if (data && data.length > 0) {
            setExerciseInstance(data[0].instance+1);

            let exerciseSessionData = data

            const prevSessions = []
            
            for(let i =0; i<data.length; i++){

                
                const {data, error} = await supabase
                .from('sets')
                .select('set, weight, reps')
                .eq('session_id', exerciseSessionData[i].session_id)

                if(error){

                    console.error(error.message)
                    return
                }

                prevSessions.push(data)
            }

            setPreviousSessions(prevSessions);
            setDate(data)
        }
    }

   const submit = () => {

        if((Object.keys(sessionReps).length < 1 && Object.keys(sessionWeights).length < 1) || (Object.keys(sessionReps).length != Object.keys(sessionWeights).length)){
            
            const longestDictLength = sets.length

            const newMissingFromReps = {...missingFromReps}
            const newMissingFromWeight = {...missingFromWeight}

            for(let i = 0; i< longestDictLength; i++){
                !(i in sessionReps) ? newMissingFromReps[i] = null : null
                !(i in sessionWeights) ? newMissingFromWeight[i] = null : null
            }

            setMissingFromReps(newMissingFromReps)
            setMissingFromWeight(newMissingFromWeight)

        }else{
            

            uploadDataToSupaBase()
            showCards()


        }
   }

   useEffect(()=>{
        get_and_set_exercise_instance()

        if(exerciseState.hasPreviousState()){
            setSets(exerciseState.getSets())
            setSessionReps(exerciseState.getSessionReps())
            setSessionWeights(exerciseState.getSessionWeights())
        }else{
            exerciseState.setExercise(exercise)
            exerciseState.setSets(sets)
            exerciseState.setSessionReps(sessionReps)
            exerciseState.setSessionWeights(sessionWeights)
        }
   },[])

    return (
    <div style={{height:"100%"}}>
        <header id='header-container'>
            <label id="day-label-container" style={{fontWeight:"bold", textTransform:"uppercase"}}>{exercise}</label>
        </header>
        <section className="exercise-graph-container">

        <div id="previous-sessions-container">
            {previousSessions.map((sessionData, sessionIndex) => (
                <div key={sessionIndex} style={{ width: "100%", height: "30%", border: "2px solid black", display: "flex", flexDirection: "column", justifyContent: "space-between", paddingLeft: "5px", paddingRight: "5px" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        {sessionData.map((setData, setIndex) => (
                            <div key={setIndex} style={{ marginBottom: "10px" }}>
                                <p>Weight: {setData.weight}</p>
                                <p>Reps: {setData.reps}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ paddingBottom: "5px" }}>
                        {date[sessionIndex].date_created}
                    </div>
                </div>
            ))}
        </div>

            <div style={{height:"20%"}}></div>

                
            <div id="new-session-container">

                <div style={{width:"90%", display:"flex", flexDirection:"row"}}>
                {sets.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1, 
                            borderRight: "2px solid black",
                            maxWidth:"40%"
                        }}
                    >
                        <div style={{width:"100%", height:"10%"}}>
                            Set {index + 1}
                        </div>
                        
                        <div style={{display:"flex", width:"100%", height:"90%", alignItems:"center"}}>
                            <input
                            type="number" 
                            placeholder="reps"
                            value={sessionReps[index] ?? ""}
                            onChange={(e)=>{updateSessionReps(e, index)}} 
                            style={{width:"49%", 
                                marginTop:"10%", 
                                marginLeft:"10%", 
                                marginBottom:"10%", 
                                marginRight:"5%",
                                ...(index in missingFromReps ? {border: "1px solid red"}: {})
                            }}
                        />
                            <div style={{display:"flex", alignItems:"center"}}>:</div>
                            <input 
                                type="number"
                                placeholder="weight" 
                                value = {sessionWeights[index] ?? ""}
                                onChange={(e)=>{updateSessionWeights(e, index)}} 
                                style={{width:"49%", 
                                marginTop:"10%", 
                                marginRight:"10%", 
                                marginBottom:"10%", 
                                marginLeft:"5%",
                                ...(index in missingFromWeight ? {border: "1px solid red"}: {})
                                }}
                            />
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

            

        </section>

        <footer style={{height:"10%", display:"flex", flexDirection:"row"}}>
                <div style={{width:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <button 
                        id="exercise-back-button"
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={() => {
                            showCards();
                            exerciseState.reset();
                        }}
                        
                        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                </div>

                <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <button
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={()=>{
                            submit()
                            exerciseState.reset()
                        }}
                        style={{
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
                    >
                        Log Workout
                    </button>
                </div>
        </footer>
        
    </div>
    )
}