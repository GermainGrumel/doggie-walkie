import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useState } from "react";

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";
    const newPhotos = [
      {
        filepath: "assets/images/" + fileName,
        webviewPath: photo.webPath,
      },
      ...photos,
    ];
    setPhotos(newPhotos);
  };

  return {
    photos,
    takePhoto,
  };
}
