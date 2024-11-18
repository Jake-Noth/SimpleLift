import { useCreateSplit } from "../CustomHooks/useCreateSplit";

interface SetSplitState {
    setSplitDays: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export default function CreateSplit({ setSplitDays }: SetSplitState) {
    
   const {loading, error, addDay, setSplit, removeDay, days, setDays} = useCreateSplit(setSplitDays)

    return (
        <>
            <section className="header">
                <img src="public/logo.png" id="logo" />
            </section>

            <h1>Create your workout split</h1>

            <div id="daysContainer">
                {days.map((element, index) => (
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
                        <button id="deleteButton" onClick={() => removeDay(index)} />
                    </div>
                ))}
                <button onClick={addDay} id="addButton"></button>
            </div>

            <div id="continueContainer">
                {error && <p className="error">Failed to save. Please try again.</p>}
                <button
                    onClick={() => setSplit(days)}
                    id="continueButton"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : error ? 'Retry' : 'Continue'}
                </button>
            </div>
        </>
    );
}
