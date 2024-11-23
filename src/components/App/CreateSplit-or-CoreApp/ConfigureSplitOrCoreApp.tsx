import CreateSplit from "./Create-split/CreateSplit";
import { useFetchSplit } from "./useFetchSplit";
import CoreApp from "./CoreApp/CoreApp";


export default function ConfigureSplitOrCoreApp() {
  const { days, loading, dayUUID, error, retryFetch } = useFetchSplit()

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
      {days && dayUUID ? (
        <CoreApp days={days} daysUUIDs = {dayUUID} />
      ) : (
        <CreateSplit retryFetch = {retryFetch} />
      )}
    </>
  );
}
