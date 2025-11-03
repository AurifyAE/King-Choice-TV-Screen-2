import { useEffect, useState } from "react";
import { SpotRateProvider } from "./context/SpotRateContext";
import { useConnectionState } from "use-connection-state";
import "./App.css";
import TvScreen from "./pages/tvscreenView";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [isTvScreen, setIsTvScreen] = useState(window.innerWidth >= 100);

  useEffect(() => {
    const baseWidth = 1920;
    const baseHeight = 1080;
    const app = document.getElementById("tv-app-container");

    if (!app) return;

    // Debounce function for better performance
    let resizeTimeout;
    const debounce = (func, delay = 100) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(func, delay);
    };

    // Advanced scaling logic
    const scaleApp = () => {
      if (!app) return;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Calculate scale maintaining aspect ratio
      const scale = Math.min(screenWidth / baseWidth, screenHeight / baseHeight);

      // Center positioning (letterboxing effect)
      const offsetX = (screenWidth - baseWidth * scale) / 2;
      const offsetY = (screenHeight - baseHeight * scale) / 2;

      // Apply styles
      app.style.transform = `scale(${scale})`;
      app.style.transformOrigin = "top left";
      app.style.position = "absolute";
      app.style.left = `${offsetX}px`;
      app.style.top = `${offsetY}px`;
      app.style.transition = "transform 0.2s ease, left 0.2s ease, top 0.2s ease";
    };

    // Handle resize event
    const handleResize = () => {
      setIsTvScreen(window.innerWidth >= 100);
      debounce(scaleApp, 150);
    };

    // Initialize once
    scaleApp();
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", scaleApp);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", scaleApp);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <SpotRateProvider>
      <div
        id="tv-app-container"
        style={{
          width: "1920px",
          height: "1080px",
          overflow: "hidden",
        }}
      >
        {!isTvScreen ? <ErrorPage /> : <TvScreen />}
      </div>
    </SpotRateProvider>
  );
}

export default App;
