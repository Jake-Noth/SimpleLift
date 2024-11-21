import { useState, useEffect } from "react";

export function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const updateViewportHeight = () => {
    setViewportHeight(window.innerHeight);
  };

  useEffect(() => {
    updateViewportHeight(); // Initialize the viewport height on load
    window.addEventListener("resize", updateViewportHeight); // Update on resize

    return () => {
      window.removeEventListener("resize", updateViewportHeight); // Cleanup on unmount
    };
  }, []);

  return viewportHeight;
}
