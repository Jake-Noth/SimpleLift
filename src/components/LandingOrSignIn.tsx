import { useState } from "react";
import SignInPage from "./SignInPage";
import Home from "./LandingPage";

type LandingPageProps = {
    setSession: React.Dispatch<React.SetStateAction<null>>;
}

export default function LandingPage({setSession}: LandingPageProps) {
    const [signIn, setSignIn] = useState(false);

    return (
        <>
            {signIn ? <SignInPage setSession = {setSession} /> : <Home setSignIn={setSignIn} />}
        </>
    );
}
