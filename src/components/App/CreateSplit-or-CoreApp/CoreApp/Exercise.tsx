import { useContext, useState } from "react"
import { useSupabase } from "../../../../../useSupaBaseContext";

interface ExerciseProps {
    exercise: string
    showCards: () => void
}

export default function Exercise({exercise, showCards}:ExerciseProps){

    const [sets, setSets] = useState<number[]>([1]);
    const [setReps, setSetReps] = useState<{ [key: number]: number }>({});
    const [setWeights, setSetWeights] = useState<{ [key: number]: number }>({});
    const [missingFromReps, setMissingFromReps] = useState<{ [key: number]: null }>({});
    const [missingFromWeight, setMissingFromWeight] = useState<{ [key: number]: null }>({});

    const {supabase, session} = useSupabase()

    const addSet = () => {
        setSets((prevSets) => [...prevSets, prevSets.length + 1]);
    };

    const removeSet = () => {

        if(sets.length > 1){
            const new_reps = { ...setReps };
            const new_weights = { ...setWeights };
        
            const index = sets.length - 1;
        
            delete new_reps[index];
            delete new_weights[index];

            updateMissingReps(index)
            updateMissingWeight(index)
        
            setSetReps(new_reps);
            setSetWeights(new_weights);
        
            setSets((prevSets) => prevSets.slice(0, -1));
        }
        
    };

    const updateSetReps = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {

        if(event.target.value){
            const newReps = { ...setReps };
            newReps[index] = parseInt(event.target.value, 10)
            setSetReps(newReps);

            updateMissingReps(index)
        }
        else{
            const newReps = { ...setReps};
            delete newReps[index]
            setSetReps(newReps)
        }

    };

    const updateSetWeights = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        if(event.target.value){
            const newWeights = { ...setWeights };
            newWeights[index] = parseInt(event.target.value, 10)
            setSetWeights(newWeights);

            updateMissingWeight(index)

        }else{
            const newWeights = { ...setWeights };
            delete newWeights[index]
            setSetWeights(newWeights);
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
            date_created: new Date
          }
        ])
        .select('session_id')
        .single();

      if (error) {
        console.error('Error inserting data:', error.message);
        return;
      }

      for(let i =0; i< Object.keys(setReps).length;i++){
        
            const { error} = await supabase
            .from('sets')
            .insert([
                {
                    session_id: data.session_id,
                    set: i+1,
                    weight: setWeights[i],
                    reps: setReps[i]
                }
            ])

            if (error) {
                console.error('Error inserting set:', error.message);
                return;
            }

            console.log('inserted set')

      }
    }

   const submit = () => {

        if((Object.keys(setReps).length < 1 && Object.keys(setWeights).length < 1) || (Object.keys(setReps).length != Object.keys(setWeights).length)){
            
            const longestDictLength = sets.length

            const newMissingFromReps = {...missingFromReps}
            const newMissingFromWeight = {...missingFromWeight}

            for(let i = 0; i< longestDictLength; i++){
                !(i in setReps) ? newMissingFromReps[i] = null : null
                !(i in setWeights) ? newMissingFromWeight[i] = null : null
            }

            setMissingFromReps(newMissingFromReps)
            setMissingFromWeight(newMissingFromWeight)

        }else{
            

            uploadDataToSupaBase()


        }
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
                                maxWidth:"40%"
                            }}
                        >
                            <div style={{width:"100%", height:"10%"}}>
                                Set {index + 1}
                            </div>
                            
                            <div style={{display:"flex", width:"100%", height:"90%", alignItems:"center"}}>
                                <input 
                                placeholder="reps" 
                                onChange={(e)=>{updateSetReps(e, index)}} 
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
                                    placeholder="weight" 
                                    onChange={(e)=>{updateSetWeights(e, index)}} 
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

            </div>

        </section>

        <footer style={{height:"10%", display:"flex", flexDirection:"row"}}>
                <div style={{width:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <button id="exercise-back-button" onClick={showCards}/>
                </div>

                <div style={{width:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <button onClick={submit}/>
                </div>
        </footer>
        
    </div>
    )
}