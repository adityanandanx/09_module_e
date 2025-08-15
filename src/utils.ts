// will fix the eslint errors later, too busy now

// add proper types later
export const formatCaption = (filename: string) => {
  if (!filename) return "";
  const nameWithoutExtension = filename.split(".").slice(0, -1).join(".");
  return nameWithoutExtension
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// move this to env vars later
export const samplePhotosData = [
  {
    id: "sample1",
    url: "/sample/beautiful-view-in-lyon.jpg",
    filename: "beautiful-view-in-lyon.jpg",
  },
  {
    id: "sample2",
    url: "/sample/place-bellecour-lyon.jpg",
    filename: "place-bellecour-lyon.jpg",
  },
  {
    id: "sample3",
    url: "/sample/basilique-notre-dame-de-fourviere-lyon.jpg",
    filename: "basilique-notre-dame-de-fourviere-lyon.jpg",
  },
  {
    id: "sample4",
    url: "/sample/tour-metalique-lyon.jpg",
    filename: "tour-metalique-lyon.jpg",
  },
];
