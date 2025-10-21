import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  constructor(public photoService: PhotoService) {}

  ngOnInit() {
    this.photoService.loadSaved();  // cargar fotos al inicio
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
