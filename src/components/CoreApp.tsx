import { useEffect, useState } from "react";
import CreateSplit from "./CreateSplit";
import { useSupabase } from "../SupaBaseContext";


type LandingPageProps = {
    setSession: React.Dispatch<React.SetStateAction<null>>;
};

export default function CoreApp() {
    const [days, setDays] = useState(['']);
    const {supabase, session} = useSupabase()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        const fetchData = async () => {
            const id = session?.user.id

            const { data, error } = await supabase
                .from('Days')
                .select('day, order')
                .eq('act_ID', id);

            if(data?.length != 0){
                const sortedData = data?.sort((a, b) => a.order - b.order);
                const daysArray: string[] = [];
                sortedData?.forEach(item => daysArray.push(item.day));

                setDays(daysArray)
            }

            setLoading(false)
        }

        fetchData()

    },[])





    if(loading){
        return(
            <div>loading...</div>
        )
    }



    return (
        <>
            {days[0] !== '' ? (
                <div>Content for when `days[0]` is not an empty string</div>
            ) : (
                <CreateSplit setSplitDays={setDays} />
            )}
        </>
    );
}
