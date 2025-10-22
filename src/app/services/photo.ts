import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Geolocation } from '@capacitor/geolocation';

export interface UserPhoto {
  filepath?: string;       // Ruta del archivo en filesystem
  webviewPath?: string;    // Para mostrar en <ion-img>
  latitude?: number;
  longitude?: number;
  mapLink?: string;
}

@Injectable({ providedIn: 'root' })
export class PhotoService {
  public photos: UserPhoto[] = [];

  // Cargar fotos guardadas
  async loadSaved() {
    try {
      const file = await Filesystem.readFile({
        path: 'photos.json',
        directory: Directory.Data
      });
      
      // Manejar caso donde file.data puede ser string o Blob
      let jsonData: string;
      if (typeof file.data === 'string') {
        jsonData = file.data;
      } else {
        // Si es Blob, convertir a texto
        jsonData = await (file.data as Blob).text();
      }
      
      this.photos = JSON.parse(jsonData);
    } catch (e) {
      console.log('No hay fotos guardadas:', e);
      this.photos = [];
    }
  }

  // Guardar lista completa en JSON
  async savePhotos() {
    await Filesystem.writeFile({
      path: 'photos.json',
      data: JSON.stringify(this.photos),
      directory: Directory.Data
    });
  }

  // Tomar nueva foto y obtener ubicación
  async addNewToGallery() {
    //Tomar foto
    const photo: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90
    });

    //Guardar en filesystem
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    // Obtener ubicación
    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const mapLink = `https://www.google.com/maps/@${lat},${lng}`;

    // Guardar en arreglo
    const savedPhoto: UserPhoto = {
      filepath: fileName,
      webviewPath: photo.webPath,
      latitude: lat,
      longitude: lng,
      mapLink
    };

    this.photos.unshift(savedPhoto);

    //Guardar fotos en JSON
    await this.savePhotos();
  }

  // Convertir Photo a base64
  private async readAsBase64(photo: Photo): Promise<string> {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Eliminar foto
  async deletePhoto(photo: UserPhoto, index: number) {
    this.photos.splice(index, 1);
    if (photo.filepath) {
      try {
        await Filesystem.deleteFile({
          path: photo.filepath,
          directory: Directory.Data
        });
      } catch (e) {
        console.error('Error eliminando archivo', e);
      }
    }
    await this.savePhotos();
  }
}
