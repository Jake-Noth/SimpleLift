import { useState, useEffect } from "react";
import { useSupabase } from "../../../../useSupaBaseContext";

export function useFetchSplit() {
  const [days, setDays] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dayUUID, setDayUUID] = useState<string[] | null>(null)
  const { supabase, session } = useSupabase();

  const fetchData = async () => {
    try {
      setLoading(true);

      const id = session?.user.id;
      if (!id) {
        throw new Error("User ID is missing.");
      }

      const { data, error } = await supabase
        .from("Day")
        .select("day, order, row_id")
        .eq("user_id", id);

      if (error) {
        throw new Error("Failed to fetch data.");
      }

      if (data?.length) {
        const sortedData = data.sort((a, b) => a.order - b.order);
        setDays(sortedData.map((item) => item.day));
        setDayUUID(sortedData.map((item) => item.row_id));
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching user's split:", err);
      setError(err.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };


  const changeSplit = async () => {
    try {
      setDays(null);
  
      const id = session?.user.id;
      if (!id) {
        throw new Error("User ID is missing.");
      }
  
      const { error: exerciseError } = await supabase
        .from("MyCurrentExercise")
        .delete()
        .eq("user_id", id);
  
      if (exerciseError) {
        throw new Error("Error deleting rows from 'MyCurrentExercise': " + exerciseError.message);
      }

      const { error: dayError } = await supabase
        .from("Day")
        .delete()
        .eq("user_id", id);
  
      if (dayError) {
        throw new Error("Error deleting rows from 'Day': " + dayError.message);
      }


    } catch (err: any) {
      console.error("Error in changeSplit:", err.message || err);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  return { days, loading, error ,dayUUID, retryFetch: fetchData, changeSplit};
}
