import { useState } from "react";
import CreateSplit from "./CreateSplit";

type LandingPageProps = {
    setSession: React.Dispatch<React.SetStateAction<null>>;
};

export default function CoreApp() {
    const [days, setDays] = useState(['']);


    console.log(days)

    return (
        <>
            {days[0] !== '' ? (
                <div>Content for when `days[0]` is not an empty string</div>
            ) : (
                <CreateSplit setSplitDays={setDays} />
            )}
        </>
    );
}
