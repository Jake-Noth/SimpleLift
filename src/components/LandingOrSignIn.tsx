import { useState } from "react";
import SignInPage from "./SignInPage";
import LandingPage from "./LandingPage";


export default function LandingOrSignIn() {
    const [isSignedIn, setSignedIn] = useState(false);

    return (
        <>
            {isSignedIn ? <SignInPage/> : <LandingPage onSignIn={() => setSignedIn(true)} />}
        </>
    );
}
