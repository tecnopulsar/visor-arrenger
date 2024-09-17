"use client";
import { useState } from "react";

export default function ImageFileAccess() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  // const [imageFile, setImageFile] = useState(null);

  // Función para abrir un archivo de imagen
  const handleOpenImage = async () => {
    try {
      if (!window.showOpenFilePicker) {
        alert("Your browser does not support the File System Access API");
        return;
      }

      // Abrir cuadro de diálogo para seleccionar una imagen
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Image files",
            accept: {
              "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"],
            },
          },
        ],
      });

      const file = await fileHandle.getFile();
      const fileURL = URL.createObjectURL(file);

      setFileName(file.name);
      setImageSrc(fileURL);
      setImageFile(file);
    } catch (error) {
      console.error("Error opening image file:", error);
    }
  };

  // Función para guardar la imagen
  const handleSaveImage = async () => {
    try {
      if (!window.showSaveFilePicker) {
        alert("Your browser does not support the File System Access API");
        return;
      }

      const fileHandle = await window.showSaveFilePicker({
        suggestedName: fileName || "new-image.png",
        types: [
          {
            description: "Image files",
            accept: { "image/png": [".png"], "image/jpeg": [".jpeg", ".jpg"] },
          },
        ],
      });

      const writableStream = await fileHandle.createWritable();
      const imageBlob = await fetch(imageSrc).then((res) => res.blob());
      await writableStream.write(imageBlob);
      await writableStream.close();

      alert("Image saved successfully!");
    } catch (error) {
      console.error("Error saving image file:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        File System Access API - Image Example
      </h1>

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleOpenImage}
        >
          Open Image
        </button>
      </div>

      {imageSrc && (
        <div className="mb-4">
          <p>
            <strong>File Name:</strong> {fileName}
          </p>
          <img
            src={imageSrc}
            alt="Selected"
            className="max-w-full h-auto mb-4"
          />
          {/* Aquí podrías agregar más manipulaciones de imagen */}
        </div>
      )}

      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveImage}
          disabled={!imageSrc}
        >
          Save Image
        </button>
      </div>
    </div>
  );
}
