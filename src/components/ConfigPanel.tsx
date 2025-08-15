import { useState } from "react";
import { formatCaption } from "../utils";

// config panel
export const ConfigPanel = ({
  isOpen,
  setIsOpen,
  operatingMode,
  setOperatingMode,
  activeTheme,
  setActiveTheme,
  photos,
  setPhotos,
}: any) => {
  const [dragItem, setDragItem] = useState<number>(null);
  const dragOverItem = useState<number>(null);

  const handleSort = () => {
    let newPhotos = [...photos];
    const draggedItemContent = newPhotos.splice(dragItem, 1)[0];
    newPhotos.splice(dragOverItem[0], 0, draggedItemContent);
    setDragItem(null);
    dragOverItem[1](null);
    setPhotos(newPhotos);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-30 flex justify-end">
      <div className="w-full max-w-sm absolute left-1/2 top-10 max-h-screen -translate-x-1/2 bg-white rounded-md shadow-2xl p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>

        {/* mode slect */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Operating Mode</h3>
          <div className="flex flex-col space-y-2">
            {["manual", "auto", "random"].map((mode) => (
              <button
                key={mode}
                onClick={() => setOperatingMode(mode)}
                className={`capitalize px-4 py-2 rounded-lg text-left ${
                  operatingMode === mode
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* theme selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {["A", "B", "C", "D", "E", "F"].map((theme) => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={`px-4 py-2 rounded-lg ${
                  activeTheme === theme
                    ? "bg-blue-500 text-white font-semibold"
                    : "bg-gray-100"
                }`}
              >
                Theme {theme}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Photo Order</h3>
          <ul className="space-y-2">
            {photos.map((photo: any, index: number) => (
              <li
                key={photo.id}
                draggable
                onDragStart={() => setDragItem(index)}
                onDragEnter={() => dragOverItem[1](index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                className="flex items-center bg-gray-100 p-2 rounded-lg cursor-grab active:cursor-grabbing"
              >
                <img
                  src={photo.url}
                  alt={photo.filename}
                  className="w-10 h-10 object-cover rounded-md mr-3"
                />
                <span className="text-sm truncate text-gray-800">
                  {formatCaption(photo.filename)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
