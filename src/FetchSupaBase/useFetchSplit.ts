import { useState, useEffect } from "react";
import { useSupabase } from "../SupaBaseContext";

export function useFetchSplit() {
  const [days, setDays] = useState<string[]>(['']);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { supabase, session } = useSupabase();

  const fetchData = async () => {
    try {
      setLoading(true);

      const id = session?.user.id;
      if (!id) {
        throw new Error("User ID is missing.");
      }

      const { data, error } = await supabase
        .from("Days")
        .select("day, order")
        .eq("act_ID", id);

      if (error) {
        throw new Error("Failed to fetch data.");
      }

      if (data?.length) {
        const sortedData = data.sort((a, b) => a.order - b.order);
        setDays(sortedData.map((item) => item.day));
      } else {
        setDays(['']);
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching user's split:", err);
      setError(err.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { days, loading, error, setDays, retryFetch: fetchData};
}
