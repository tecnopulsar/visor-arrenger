// src/app/api/preview/route.js
import { NextResponse } from 'next/server';

// API proxy function to fetch the image from an HTTP URL
export async function GET() {
  try {
    // URL de la API externa HTTP que devuelve el preview
    const externalApiUrl = 'http://192.168.16.45/api/v2/public/common/devices/Source3-PCShow/preview';
    
    // Fetch the image from the external API
    const response = await fetch(externalApiUrl);
    
    // Check if the response is OK (status 200)
    if (!response.ok) {
      return NextResponse.json({ error: 'Error fetching the preview image' }, { status: response.status });
    }
    
    // Obtener el blob de la imagen desde el servidor externo
    const imageBlob = await response.blob();

    // Convertir el blob en un buffer para enviarlo al frontend
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Devolver la imagen al frontend, con el tipo de contenido adecuado
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg', // Asumimos que es una imagen JPEG
        'Content-Length': buffer.length,
      },
    });

  } catch (error) {
    console.error('Error fetching the image from the external API:', error);
    return NextResponse.json({ error: 'Failed to fetch the image' }, { status: 500 });
  }
}
