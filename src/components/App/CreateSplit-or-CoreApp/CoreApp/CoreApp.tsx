import { useState } from "react";
import SettingsPage from "./SettingsPage";
import Cards from "./Cards/Cards";
import Exercise from "./Exercise";

interface cardProps {
  days: string[];
  daysUUIDs: string[];
  changeSplit: () => void;
}

export default function CoreApp(appProps: cardProps) {
  const [screen, setScreen] = useState(1);
  const [exercise, setExercise] = useState<string>("")

  const showExercise = (exercise:string) => {
        setExercise(exercise)
        setScreen(3)
  }

  const renderScreen = () => {
    switch (screen) {
        case 1:
            return (
            <Cards
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
                    <Exercise exercise={exercise} />
            );
      default:
        return <div>Invalid Screen</div>;
    }
  };

  return <>{renderScreen()}</>;
}
