import React, { useState, useEffect } from "react";
import ConfigureSplitOrCoreApp from "./components/ConfigureSplitOrCoreApp";
import LandingOrSignIn from "./components/LandingOrSignIn";
import './styles.css';
import { useSupabase } from "./CustomHooks/useSupaBaseContext";

export default function App() {
  const { session } = useSupabase();

  // State to store the viewport height
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Function to update the viewport height dynamically
  const updateViewportHeight = () => {
    setViewportHeight(window.innerHeight);
  };

  // Set up a useEffect hook to track window resize
  useEffect(() => {
    updateViewportHeight(); // Initialize the viewport height on load
    window.addEventListener("resize", updateViewportHeight); // Update on resize

    return () => {
      window.removeEventListener("resize", updateViewportHeight); // Cleanup on unmount
    };
  }, []);

  return (
    <div style={{ height: viewportHeight, display: "flex", flexDirection: "column" }}>
      {/* Conditional rendering based on session */}
      {session ? <ConfigureSplitOrCoreApp /> : <LandingOrSignIn />}
    </div>
  );
}
