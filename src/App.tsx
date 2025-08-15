import { useState } from "react";
import "./App.css";
import "./styles/themes.css";
import Slide from "./components/Slide";

function App() {
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  return (
    <div className="flex flex-col gap-2">
      {/* Image Upload / Sample Loader */}
      {images.length === 0 ? (
        <div className="flex flex-col items-center gap-2">
          <input
            type="file"
            multiple
            accept="image/*"
            className="p-10 border border-dashed rounded-md"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              const res = files.map((file) => ({
                url: URL.createObjectURL(file),
                name: file.name.replaceAll("-", " "),
              }));
              setImages(res);
            }}
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => {
              setImages([
                {
                  url: "/sample/basilique-notre-dame-de-fourviere-lyon.jpg",
                  name: "Basilique Notre Dame De Fourviere Lyon",
                },
                {
                  url: "/sample/beautiful-view-in-lyon.jpg",
                  name: "beautiful view in lyon",
                },
                {
                  url: "/sample/place-bellecour-lyon.jpg",
                  name: "place bellecour lyon",
                },
                {
                  url: "/sample/tour-metalique-lyon.jpg",
                  name: "tour metalique lyon",
                },
              ]);
            }}
          >
            Use sample
          </button>
        </div>
      ) : null}
      {images.map((item, i) => (
        <Slide key={item.url + i} image={item} isActive />
      ))}
    </div>
  );
}

export default App;
