// src/app/api/downloads/route.js
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Obtener la ruta de la carpeta "Downloads" del usuario en Windows
    const downloadsFolder = path.join(os.homedir(), 'Downloads');

    // Leer el contenido de la carpeta "Downloads"
    const files = await fs.readdir(downloadsFolder);

    // Filtrar archivos cuyo nombre sea exactamente 'preview'
    const filteredFiles = files.filter(file => path.parse(file).name === 'preview');

    // Generar la lista de archivos filtrados
    const filesList = filteredFiles.map((file) => ({
      name: file,
      path: path.join(downloadsFolder, file),
    }));

    // Responder con JSON utilizando NextResponse
    return NextResponse.json({ files: filesList }, { status: 200 });
  } catch (error) {
    console.error('Error leyendo la carpeta Downloads:', error);
    return NextResponse.json({ error: 'No se pudo acceder a la carpeta Downloads.' }, { status: 500 });
  }
}
