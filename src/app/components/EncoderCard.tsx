"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EncoderCard() {
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const preview = await axios.get(
          `http://192.168.16.45/api/v2/public/common/devices/Source3-PCShow/preview`
        );
        setImagePreview(preview.data);
      } catch (error) {
        console.error("Error fetching preview:", error);

        // Mostrar el toast de error
        toast("Error de Database", {
          position: "top-right",
          description:
            "No se pudo cargar la imagen del encoder. Por favor, inténtalo de nuevo.",
        });
      }
    };

    fetchPreview();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Encoder</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
        <Image
          src={imagePreview}
          width={240}
          height={135}
          alt="Preview image encoder"
        />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
