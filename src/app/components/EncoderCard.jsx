'use client';

import { useEffect, useState } from 'react';

export default function EncoderCard({ nameDevice }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Construir la URL de la API basada en el ID del decodificador
        const response = await fetch(`http://192.168.16.45/api/v2/public/common/devices/${nameDevice}/preview`);
        // const response = await fetch(`http://localhost:3005/api/v2/public/common/devices/${nameDevice}/preview`);
        if (!response.ok) {
          console.log("error")
          throw new Error('Failed to fetch image');

        }

        // Actualizar la imagen en el componente
        setImageSrc(response.url);
      } catch (error) {
        console.error('Error fetching the preview image:', error);
      }
    };
    fetchImage(); // Llamar a la función de fetch al montar el componente

    const interval = setInterval(fetchImage, 20000); // Cada 20 segundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [nameDevice]);

  return (
    <div>
      <h2>Preview for Decoder {nameDevice}</h2>
      {imageSrc ? (
        <img src={imageSrc} alt={`Preview for decoder ${nameDevice}`} width={240} height={135} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}
