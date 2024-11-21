import ConfigureSplitOrCoreApp from "./components/ConfigureSplitOrCoreApp";
import LandingOrSignIn from "./components/LandingOrSignIn";
import './styles.css';
import { useSupabase } from "./CustomHooks/useSupaBaseContext";
import { useViewportHeight } from "./CustomHooks/useViewPortHeight";

export default function App() {
  const { session } = useSupabase();
  const viewportHeight = useViewportHeight()

  return (
    <div style={{ height: viewportHeight, display: "flex", flexDirection: "column" }}>
      {session ? <ConfigureSplitOrCoreApp /> : <LandingOrSignIn />}
    </div>
  );
}
