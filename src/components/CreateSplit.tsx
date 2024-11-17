import { useState } from "react";

interface CreateSplitProps {
    setSplitDays: React.Dispatch<React.SetStateAction<string[]>>; // State setter for an array of strings
  }

export default function CreateSplit({setSplitDays}: CreateSplitProps){
    
    const [days, setDays] = useState([''])
    
    const addDay = () => {
        let newDays = [...days];
        newDays.push('');
        setDays(newDays);
    };

    const setSplit = (days: string[]) => {

        let filteredDays = []

        for (const day of days){
            if(day!= ''){
                filteredDays.push(day)
            }
        }

        setSplitDays(filteredDays)
    }

    const removeDay = (index: number) => {
        const newItems = [...days.slice(0, index), ...days.slice(index + 1)];
        setDays(newItems);
    };

    return (
        <>
            <section className="header">
                <img src="public/logo.png" id="logo" />
            </section>

            <h1>Create your workout split</h1>

            <div id='daysContainer'>

                {days.map((element, index) => {
                    return (
                        <div key={index} id="dayDiv">
                            <input
                                type="text"
                                value={element}
                                placeholder={element || "Enter day"}
                                onChange={(e) => {
                                    let newDays = [...days];
                                    newDays[index] = e.target.value;
                                    setDays(newDays);
                                }}
                            />
                            <button id='deleteButton' onClick={() => { removeDay(index) }}/>
                        </div>
                    );
                })}

                <button onClick={addDay} id='addButton'></button>

            </div>

            
            <div id="continueContainer">
                <button onClick ={()=>{
                    setSplit(days)
                }} id='continueButton'>Continue</button>
            </div>
            
        </>
    );
}