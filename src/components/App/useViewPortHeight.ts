import { useState, useEffect } from "react";

export function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const updateViewportHeight = () => {
    setViewportHeight(window.innerHeight);
  };

  useEffect(() => {
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  return viewportHeight;
}
