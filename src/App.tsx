import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { CommandBar } from "./components/CommandBar";
import { ConfigPanel } from "./components/ConfigPanel";
import { MainSlideshow } from "./components/MainSlideshow";
import "./styles/base.css";
import "./styles/theme-a.css";
import "./styles/theme-b.css";
import "./styles/theme-c.css";
import "./styles/theme-d.css";
import "./styles/theme-e.css";
import "./styles/theme-f.css";
import { samplePhotosData } from "./utils";
import { Dropzone } from "./components/Dropzone";

// main app - fix types when we have time

// --- Main App Component ---
export default function App() {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);
  const [activeTheme, setActiveTheme] = useState("A");
  const [operatingMode, setOperatingMode] = useState("manual");
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const slideshowRef = useRef(null);

  // wait for exit animation duration
  const animationDuration = {
    A: 0,
    B: 500,
    C: 500,
    D: 500,
    E: 1000,
    F: 800,
  }[activeTheme];

  const slideDuration = 4000;

  const handleNext = useCallback(() => {
    if (photos.length === 0) return;
    // immediate DOM update
    flushSync(() => {
      setExitingIndex(currentIndex);
    });
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
      setExitingIndex(null);
    }, animationDuration);
  }, [currentIndex, photos.length, animationDuration, activeTheme]);

  const handlePrev = useCallback(() => {
    if (photos.length === 0) return;
    flushSync(() => {
      setExitingIndex(currentIndex);
    });

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      setExitingIndex(null);
    }, animationDuration);
  }, [currentIndex, photos.length, animationDuration]);

  const handleRandom = useCallback(() => {
    if (photos.length <= 1) return;
    flushSync(() => {
      setExitingIndex(currentIndex);
    });
    setTimeout(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * photos.length);
      } while (nextIndex === currentIndex);
      setCurrentIndex(nextIndex);
      setExitingIndex(null);
    }, animationDuration);
  }, [currentIndex, photos.length, animationDuration]);

  useEffect(() => {
    if (photos.length === 0) return;
    let interval;
    if (operatingMode === "auto") {
      interval = setInterval(handleNext, slideDuration);
    } else if (operatingMode === "random") {
      interval = setInterval(handleRandom, slideDuration);
    }
    return () => clearInterval(interval);
  }, [operatingMode, photos.length, handleNext, handleRandom]);

  const toggleFullScreen = () => {
    console.log(slideshowRef);

    if (!isFullScreen) {
      slideshowRef.current
        ?.requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((err) => console.error(err));
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false));
    }
  };

  useEffect(() => {
    const onFullScreenChange = () =>
      setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);

  const loadSamplePhotos = () => {
    setPhotos(
      samplePhotosData.map((p) => ({ ...p, rotation: Math.random() * 10 - 5 }))
    );
  };

  return (
    <div ref={slideshowRef} className="h-screen max-h-screen">
      {photos.length === 0 ? (
        <div className="mx-auto h-screen flex flex-col items-center justify-center">
          <Dropzone setPhotos={setPhotos} />
          <button
            className="rounded-md bg-blue-500 px-4 py-2"
            onClick={loadSamplePhotos}
          >
            Load sample
          </button>
        </div>
      ) : (
        <>
          <MainSlideshow
            photos={photos}
            currentIndex={currentIndex}
            exitingIndex={exitingIndex}
            activeTheme={activeTheme}
            operatingMode={operatingMode}
            handleNext={handleNext}
            handlePrev={handlePrev}
            toggleFullScreen={toggleFullScreen}
            isFullScreen={isFullScreen}
            setIsConfigOpen={setIsConfigOpen}
            setIsCommandBarOpen={setIsCommandBarOpen}
          />
          <ConfigPanel
            isOpen={isConfigOpen}
            setIsOpen={setIsConfigOpen}
            operatingMode={operatingMode}
            setOperatingMode={setOperatingMode}
            activeTheme={activeTheme}
            setActiveTheme={setActiveTheme}
            photos={photos}
            setPhotos={setPhotos}
          />
          <CommandBar
            isOpen={isCommandBarOpen}
            setIsOpen={setIsCommandBarOpen}
            setOperatingMode={setOperatingMode}
            setActiveTheme={setActiveTheme}
          />
        </>
      )}
    </div>
  );
}
