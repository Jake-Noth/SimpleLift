import { useState } from "react";
import { useSupabase } from "../../../../../useSupaBaseContext";


export function useCreateSplit(retryFetch:()=> void){

    const [days, setDays] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { supabase, session } = useSupabase();

    const addDay = () => {
        let newDays = [...days];
        newDays.push('');
        setDays(newDays);
    };

    const setSplit = async (days: string[]) => {

        let filteredDays = days.filter(day => day !== '');
        
        if(filteredDays.length == 0){
            alert("You need to enter at least one day")
            return
        }
        
        setLoading(true);
        setError(false);

        const userId = session?.user?.id;

        if (!userId) {
            console.error("User ID is missing or session is not available");
            setLoading(false);
            setError(true);
            return;
        }

        const daysData = filteredDays.map((day, index) => ({
            user_id: userId,
            order: index,
            day: day,
        }));

        const { error } = await supabase.from('Day').insert(daysData);

        if (error) {
            console.error('Error inserting days:', error);
            setError(true);
            setLoading(false);
            return;
        }
        retryFetch()
        setLoading(false);
    };

    const removeDay = (index: number) => {
        const newItems = [...days.slice(0, index), ...days.slice(index + 1)];
        setDays(newItems);
    };

    return {loading, error, addDay, setSplit, removeDay, days, setDays}





}