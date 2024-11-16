import { useState, useEffect } from "react";

type LandingPageProps = {
    setSession: React.Dispatch<React.SetStateAction<null>>;
};

export default function CoreApp({ setSession }: LandingPageProps) {
    const [days, setDays] = useState(['']);

    const addDay = () => {
        let newDays = [...days];
        newDays.push('');
        setDays(newDays);
    };

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

            {days.map((element, index) => {
                return (
                    <div key={index}>
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
                        <button onClick={() => { removeDay(index) }}>remove</button>
                    </div>
                );
            })}

            <button onClick={addDay}>Add</button>

            <button>Continue</button>
        </>
    );
}
