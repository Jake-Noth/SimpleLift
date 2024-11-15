
type LandingPageProps = {
    setSession: React.Dispatch<React.SetStateAction<null>>;
}

export default function CoreApp({setSession}:LandingPageProps){


    const logout = () => {
        setSession(null)
    }

    return (
        <>
            <div>
            Hello
            </div>
            <button onClick={logout}>

            </button>
        </>
    )
}