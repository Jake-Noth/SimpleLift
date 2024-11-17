import { useState } from "react";
import SignInPage from "./SignInPage";
import Home from "./LandingPage";


export default function LandingPage() {
    const [signIn, setSignIn] = useState(false);

    return (
        <>
            {signIn ? <SignInPage/> : <Home setSignIn={setSignIn} />}
        </>
    );
}
