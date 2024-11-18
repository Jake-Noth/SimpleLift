import ConfigureSplitOrCoreApp from "./components/ConfigureSplitOrCoreApp";
import LandingOrSignIn from "./components/LandingOrSignIn";
import './styles.css'
import { useSupabase } from "./CustomHooks/useSupaBaseContext";

export default function App() {
  const {session} = useSupabase()
  
  return (
    <>
      { session ? <ConfigureSplitOrCoreApp/> : <LandingOrSignIn/>}
    </>
    
  )
}
