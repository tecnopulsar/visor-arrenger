'use client';

import { useEffect, useState } from 'react';

export default function EncoderCard({ decoderId }) {
  const [imageSrc, setImageSrc] = useState(`/preview/${decoderId}/preview.jpeg`);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Llamada a la API proxy en lugar de a la API externa directamente
        const response = await fetch('/api/preview');
        
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        // Crear un blob de la respuesta
        const blob = await response.blob();

        // Crear una URL temporal de la imagen
        const imageUrl = URL.createObjectURL(blob);

        // Actualizar la imagen en el componente
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching the preview image:', error);
      }
    }, 20000); // Cada 20 segundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [decoderId]);

  return (
    <div>
      <h2>Preview for Decoder {decoderId}</h2>
      <img src={imageSrc} alt={`Preview for decoder ${decoderId}`} width={240} height={135} />
    </div>
  );
}
