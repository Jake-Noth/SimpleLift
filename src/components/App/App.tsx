import ConfigureSplitOrCoreApp from "./CreateSplit-or-CoreApp/ConfigureSplitOrCoreApp";
import LandingOrSignIn from "./LandingPage/LandingOrSignIn";
import '../../styles.css'
import { useSupabase } from "../../../useSupaBaseContext";
import { useViewportHeight } from "./useViewPortHeight";

export default function App() {
  const { session } = useSupabase();
  const viewportHeight = useViewportHeight()

  return (
    <div style={{ height: viewportHeight, display: "flex", flexDirection: "column" }}>
      {session ? <ConfigureSplitOrCoreApp /> : <LandingOrSignIn />}
    </div>
  );
}
