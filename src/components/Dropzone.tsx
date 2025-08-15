import { useState, useRef } from "react";

export const Dropzone = ({ setPhotos }: any) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files: FileList) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (imageFiles.length > 0) {
      const newPhotos = imageFiles.map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        filename: file.name,
        rotation: Math.random() * 10 - 5,
      }));
      setPhotos((prev: any) => [...prev, ...newPhotos]);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
      className={
        "w-full h-1/2 max-w-md flex flex-col items-center justify-center text-center p-8 border-4 border-dashed rounded-2xl transition-all duration-300 cursor-pointer"
      }
    >
      <h2 className="mt-4 text-2xl font-bold">Drag & Drop Photos</h2>
      <p className="mt-2">or click to select slides</p>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};
