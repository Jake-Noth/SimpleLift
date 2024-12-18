import { useEffect, useMemo, useState } from "react";
import SettingsPage from "./SettingsPage";
import Cards from "./Cards/Cards";
import Exercise from "./Exercise";
import { ExerciseState } from "./ExerciseState"

interface cardProps {
  days: string[];
  daysUUIDs: string[];
  changeSplit: () => void;
}

export default function CoreApp(appProps: cardProps) {
  const [screen, setScreen] = useState(1);
  const [exercise, setExercise] = useState<string>("")
  const [day, setDay] = useState(appProps.days[0])
  const exerciseState = useMemo(() => new ExerciseState(), []);
  exerciseState.toString()
  
  const showExercise = (exercise:string) => {
        setExercise(exercise)
        setScreen(3)
  }

  const showCards = () => {
    setScreen(1)
  }

  useEffect(()=>{
    if(exerciseState.hasPreviousState()){
      setScreen(3)
    }
  },[])

  const renderScreen = () => {
    switch (screen) {
        case 1:
            return (
            <Cards
                day={day}
                setDay = {setDay}
                days={appProps.days}
                daysUUIDs={appProps.daysUUIDs}
                showSettings={() => setScreen(2)}
                showExercise ={showExercise}
            />
            );
        case 2:
            return (
            <SettingsPage
                showCoreApp={() => setScreen(1)}
                changeSplit={appProps.changeSplit}
            />
            );
        case 3:
            return (
                    <Exercise exercisePassed={exercise} showCards = {showCards} exerciseState = {exerciseState} />
            );
      default:
        return <div>Invalid Screen</div>;
    }
  };

  return renderScreen();
}
