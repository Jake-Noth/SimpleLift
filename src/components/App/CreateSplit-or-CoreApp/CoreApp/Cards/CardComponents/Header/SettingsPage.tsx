import { useSupabase } from "../../../../../../../../useSupaBaseContext"

interface pageSwitcher{
    showCoreApp: () => void
}


export default function SettingsPage({showCoreApp}:pageSwitcher){

    const {deleteSession} = useSupabase()

    return(<>
    <button onClick={showCoreApp}>Back</button>
    <button onClick={deleteSession}>Logout</button>
    </>)
}