import CreateSplit from "./CreateSplit";
import Card from "./Card";
import { useFetchSplit } from "../FetchSupaBase/useFetchSplit";


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
      {days[0] !== '' ? (
        <Card days={days} />
      ) : (
        <CreateSplit setSplitDays={setDays} />
      )}
    </>
  );
}
