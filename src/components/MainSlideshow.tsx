import { useCallback, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import type { PhotoType, ThemeType } from "../types";
import { formatCaption } from "../utils";

// handle shortcut keys
const useKeyPress = (targetKeys: string[], handler: any) => {
  const downHandler = useCallback(
    ({ key, ctrlKey, metaKey }: KeyboardEvent) => {
      if (
        targetKeys.includes(key) ||
        (targetKeys.includes("CTRL+K") && (ctrlKey || metaKey) && key === "k")
      ) {
        console.log("Handle:", key);
        handler(key);
      }
    },
    [targetKeys, handler]
  );

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]);
};

// autoplay slide duration ms
const SLIDE_DURATION = 2000;

export const MainSlideshow = ({
  photos,
  currentIndex,
  exitingIndex,
  activeTheme,
  operatingMode,
  handleNext,
  handlePrev,
  toggleFullScreen,
  isFullScreen,
  setIsConfigOpen,
  setIsCommandBarOpen,
}: any) => {
  const slideshowRef = useRef(null);

  useKeyPress(
    ["ArrowLeft", "ArrowRight", "Escape", "/", "CTRL+K"],
    (key: string) => {
      if (operatingMode === "manual") {
        if (key === "ArrowLeft") handlePrev();
        if (key === "ArrowRight") handleNext();
      }
      if (key === "Escape" && isFullScreen) {
        document.exitFullscreen();
      }
      if (key === "/" || key === "CTRL+K") {
        setIsCommandBarOpen(true);
      }
    }
  );

  // autoplay
  useEffect(() => {
    if (photos.length === 0) return;
    let interval: any;
    if (operatingMode === "auto") {
      interval = setInterval(handleNext, SLIDE_DURATION);
    } else if (operatingMode === "random") {
      const handleRandom = () => {
        flushSync(() => {
          let nextIndex: number;
          do {
            nextIndex = Math.floor(Math.random() * photos.length);
          } while (nextIndex === currentIndex);
        });
      };
      interval = setInterval(handleRandom, SLIDE_DURATION);
    }
    return () => clearInterval(interval);
  }, [operatingMode, photos.length, handleNext, currentIndex]);

  return (
    <div
      className={`theme-${activeTheme} w-screen h-screen bg-black text-white font-sans flex items-center justify-center relative overflow-hidden`}
      ref={slideshowRef}
    >
      {photos.length > 0 ? (
        <>
          <div className="slideshow-wrapper w-full h-full">
            {photos.map((photo: PhotoType, index: number) => (
              <Slide
                key={photo.id}
                photo={photo}
                isActive={index === currentIndex}
                isExiting={index === exitingIndex}
                theme={activeTheme}
              />
            ))}
          </div>
          {operatingMode === "manual" && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 px-5 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
              >
                {"<"}
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 px-5 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
              >
                {">"}
              </button>
            </>
          )}
        </>
      ) : (
        <div>No photos loaded</div>
      )}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <button
          onClick={toggleFullScreen}
          className="p-3 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all cursor-pointer"
          title="Toggle Fullscreen"
        >
          Fullscreen
        </button>
        <button
          onClick={() => setIsConfigOpen(true)}
          className="p-3 bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75 transition-all"
          title="Settings"
        >
          <img src="/setting-icon.png" className="w-8 h-8 invert" />
        </button>
      </div>
    </div>
  );
};

const Slide = ({
  photo,
  isActive,
  isExiting,
  theme,
}: {
  photo: PhotoType;
  isActive: boolean;
  isExiting: boolean;
  theme: ThemeType;
}) => {
  const caption = formatCaption(photo.filename);

  const slideClasses = `slide absolute inset-0 w-full h-full flex items-center justify-center 
        ${isActive ? "is-active" : "is-inactive"} 
        ${isExiting ? "is-exiting" : ""}`;

  const dStyle =
    theme === "D"
      ? {
          transform: `rotate(${photo.rotation}deg)`,
          height: "80%",
          width: "auto",
        }
      : {};

  return (
    <div className={slideClasses}>
      {theme === "E" ? (
        // theme E
        <div className="photo-wrapper w-full h-full overflow-hidden">
          <div
            className="door-half left-half"
            style={{ backgroundImage: `url(${photo.url})` }}
          ></div>
          <div
            className="door-half right-half"
            style={{ backgroundImage: `url(${photo.url})` }}
          ></div>
        </div>
      ) : (
        // others
        <div
          style={dStyle}
          className="photo-wrapper w-auto h-full max-h-screen"
        >
          <img
            src={photo.url}
            alt={caption}
            className="photo-element w-full h-full object-contain"
          />
          {(theme as unknown) !== "E" && (
            <div className="caption">
              {theme === "C"
                ? caption.split(" ").map((word, index) => (
                    <span
                      key={index}
                      className="caption-word"
                      style={{ animationDelay: `${index * 0.3}s` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))
                : caption}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
