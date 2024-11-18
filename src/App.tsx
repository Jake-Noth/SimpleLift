import ConfigureSplitOrCoreApp from "./components/ConfigureSplitOrCoreApp";
import LandingOrSignIn from "./components/LandingOrSignIn";
import './styles.css'
import { useSupabase } from "./SupaBaseContext";

export default function App() {
  const {session} = useSupabase()
  
  return (
    <>
      { session ? <ConfigureSplitOrCoreApp/> : <LandingOrSignIn/>}
    </>
    
  )
}
