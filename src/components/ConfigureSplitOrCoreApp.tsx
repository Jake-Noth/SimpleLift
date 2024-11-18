import CreateSplit from "./CreateSplit";
import { useFetchSplit } from "../CustomHooks/useFetchSplit";
import CoreApp from "./CoreApp";


export default function ConfigureSplitOrCoreApp() {
  const { days, loading, error, setDays, retryFetch } = useFetchSplit()

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error fetching split: {error}</p>
        <button onClick={retryFetch}>Retry</button>
      </div>
    );
  }

  return (
    <>
      {days ? (
        <CoreApp days={days} />
      ) : (
        <CreateSplit setSplitDays={setDays} />
      )}
    </>
  );
}
