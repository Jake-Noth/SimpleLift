import { useState } from "react"


interface cardProps{
    showSettings: () => void
    split: string[]
}

export function useGenerateCardProps({showSettings, split}:cardProps){

    const [day, setDay] = useState(split[0])
    const [showAddLiftScreen, setShowAddLiftScreen] = useState(false)

    
    const previousDay = () => {
        let cur = split.indexOf(day);
        cur = cur - 1 < 0 ? split.length - 1 : cur - 1;
        setDay(split[cur]);
    };
    
    const nextDay = () => {
        let cur = split.indexOf(day);
        cur = (cur + 1) % split.length;
        setDay(split[cur]);
    };


    return {day, showSettings, showAddLiftScreen, setShowAddLiftScreen, previousDay, nextDay}
}






