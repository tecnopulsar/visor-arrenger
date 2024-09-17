"use client";
import { useState } from "react";

export default function FileAccessText() {
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  // Función para abrir el archivo
  const handleOpenFile = async () => {
    try {
      // Verificar si el navegador soporta la API
      if (!window.showOpenFilePicker) {
        alert("Your browser does not support the File System Access API");
        return;
      }

      // Abrir el cuadro de diálogo para seleccionar el archivo
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const content = await file.text();

      setFileName(file.name);
      setFileContent(content);
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  // Función para guardar el archivo
  const handleSaveFile = async () => {
    try {
      // Verificar si el navegador soporta la API
      if (!window.showSaveFilePicker) {
        alert("Your browser does not support the File System Access API");
        return;
      }

      // Abrir cuadro de diálogo para guardar el archivo
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: fileName || "new-file.txt",
        types: [
          {
            description: "Text files",
            accept: { "text/plain": [".txt"] },
          },
        ],
      });

      const writableStream = await fileHandle.createWritable();
      await writableStream.write(fileContent);
      await writableStream.close();

      alert("File saved successfully!");
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        File System Access API Example
      </h1>

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleOpenFile}
        >
          Open File
        </button>
      </div>

      {fileName && (
        <div className="mb-4">
          <p>
            <strong>File Name:</strong> {fileName}
          </p>
          <textarea
            className="w-full h-64 p-2 border border-gray-300"
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
          />
        </div>
      )}

      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveFile}
        >
          Save File
        </button>
      </div>
    </div>
  );
}
