'use client';

import { useEffect, useState } from 'react';

export default function EncoderCard() {
  const [imageSrc, setImageSrc] = useState(``);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Descargar la imagen desde el servidor
        const response = await fetch(`http://192.168.16.45/api/v2/public/common/devices/Source3-PCShow/preview`);

        if (!response.ok) {
          throw new Error(`Error fetching image: ${response.statusText}`);
        }
        console.log(response.url);
        // console.log(JSON.stringify(response));


        setImageSrc(response.url);
      } catch (error) {
        console.error('Error fetching the preview image:', error);
      }
    };

    // Configurar el intervalo para actualizar la imagen cada 20 segundos
    const interval = setInterval(fetchImage, 20000);

    // Llamar a la función para la primera carga
    fetchImage();

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Preview for Decoder {decoderId}</h2>
      <img src={imageSrc} alt={"Preview for decoder"} width={240} height={135} />
    </div>
  );
}
