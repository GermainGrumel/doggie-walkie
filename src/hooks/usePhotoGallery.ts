import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useState } from "react";
import {
  useFilesystem,
  base64FromPath,
  availableFeatures,
} from "@capacitor-community/filesystem-react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  // const savePicture = async (photo: any, fileName: any) => {
  //   const base64Data = await base64FromPath(photo.webPath!);
  //   console.log(base64Data);
  //   let file: any = await fetch(photo.webPath!)
  //     .then((r) => r.blob())
  //     .then(
  //       (blobFile) => new File([blobFile], fileName, { type: "image/jpeg" })
  //     );
  //   console.log(file);
  //   const storage: any = getStorage();
  //   const storageRef: any = ref(storage, file);
  //   uploadBytes(storageRef, file).then((snapshot) => {
  //     console.log("Uploaded a blob or file!");
  //     console.log("snapshot :>> ", snapshot);
  //   });
  //   return {
  //     filepath: fileName,
  //     webviewPath: fileName,
  //   };
  // };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    console.log("photo", photo);

    const fileName = new Date().getTime() + ".jpg";
    const base64Data = await base64FromPath(photo.webPath!);

    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: base64Data,
      },
      ...photos,
    ];
    setPhotos(newPhotos);
  };

  return {
    photos,
    takePhoto,
    // savePicture,
  };
}
