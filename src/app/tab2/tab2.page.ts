import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoService, UserPhoto } from '../services/photo';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class Tab2Page implements OnInit {

  constructor(public photoService: PhotoService) {}

  ngOnInit() {
    this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  deletePhoto(photo: UserPhoto, index: number) {
    this.photoService.deletePhoto(photo, index);
  }

  uniquePhotos(): UserPhoto[] {
    const seen = new Set<string>();
    return this.photoService.photos.filter(p => {
      if (p.filepath && !seen.has(p.filepath)) {
        seen.add(p.filepath);
        return true;
      }
      return false;
    });
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/placeholder.png';
  }
}
