'use client';

import { useEffect, useState } from 'react';

export default function EncoderCard() {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Descargar la imagen desde el servidor
        // const response = await fetch(`/preview/1001/preview`);
        const response = await fetch(`http://192.168.16.45/api/v2/public/common/devices/Source3-PCShow/preview`);

        if (!response.ok) {
          throw new Error(`Error fetching image: ${response.statusText}`);
        }

        // Convertir la respuesta en un blob con el tipo MIME explícito 'image/jpeg'
        const blob = await response.blob();

        // Verificar si el Blob es de tipo 'image/jpeg'
        // const imageType = blob.type === 'image/jpeg' ? 'jpeg' : 'jpeg'; // Asumimos que es JPEG

        // Crear un objeto URL para la imagen blob
        const imageBlobURL = URL.createObjectURL(new Blob([blob], { type: 'image/jpeg' }));

        // Guardar la imagen en localStorage con una extensión .jpeg
        localStorage.setItem('cachedImage', imageBlobURL);

        // Actualizar la fuente de la imagen
        setImageSrc(imageBlobURL);

      } catch (error) {
        console.error('Error fetching the preview image:', error);
      }
    };

    // Verificar si hay una imagen previamente almacenada
    const cachedImage = localStorage.getItem('cachedImage');
    if (cachedImage) {
      setImageSrc(cachedImage);
    } else {
      // Si no hay imagen almacenada, la descargamos
      fetchImage();
    }

    // Configurar el intervalo para actualizar la imagen cada 20 segundos
    const interval = setInterval(fetchImage, 20000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Preview for Decoder</h2>
      {imageSrc ? (
        <img src={imageSrc} alt="Preview for decoder" width={240} height={135} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
