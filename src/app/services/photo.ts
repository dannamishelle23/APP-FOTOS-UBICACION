import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Geolocation } from '@capacitor/geolocation';

export interface UserPhoto {
  filepath?: string;       // Ruta en el sistema de archivos
  webviewPath?: string;   
  latitude?: number;
  longitude?: number;
  mapLink?: string;        // Enlace directo a Google Maps
}

@Injectable({ providedIn: 'root' })
export class PhotoService {
  public photos: UserPhoto[] = [];

  //Cargar fotos guardadas
  async loadSaved() {
    try {
      const file = await Filesystem.readFile({
        path: 'photos.json',
        directory: Directory.Data
      });

      let jsonData: string;
      if (typeof file.data === 'string') jsonData = file.data;
      else jsonData = await (file.data as Blob).text();

      this.photos = JSON.parse(jsonData) || [];
    } catch {
      this.photos = [];
    }
  }

  //Guardar todas las fotos en JSON
  async savePhotos() {
    await Filesystem.writeFile({
      path: 'photos.json',
      data: JSON.stringify(this.photos),
      directory: Directory.Data
    });
  }

  //Tomar nueva foto + guardar ubicación
  async addNewToGallery() {
    // Tomar foto
    const photo: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 85
    });

    //Guardar en filesystem
    const base64Data = await this.readAsBase64(photo);
    const fileName = `${new Date().getTime()}.jpeg`;

    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    //Obtener coordenadas
    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const mapLink = `https://www.google.com/maps?q=${lat},${lng}&z=18`;

    //Guardar en memoria
    const savedPhoto: UserPhoto = {
      filepath: fileName,
      webviewPath: photo.webPath,
      latitude: lat,
      longitude: lng,
      mapLink
    };

    this.photos.unshift(savedPhoto);
    await this.savePhotos();
  }

  //Convertir imagen a base64
  private async readAsBase64(photo: Photo): Promise<string> {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  //Eliminar foto del arreglo y del almacenamiento
  async deletePhoto(photo: UserPhoto, index: number) {
    this.photos.splice(index, 1);

    if (photo.filepath) {
      try {
        await Filesystem.deleteFile({
          path: photo.filepath,
          directory: Directory.Data
        });
      } catch (e) {
        console.warn('No se pudo eliminar archivo:', e);
      }
    }

    await this.savePhotos();
  }
}
