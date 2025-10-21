import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { LocationService } from '../services/location';
import { Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab-1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, NgIf
  ],
})

export class Tab1Page implements OnInit, OnDestroy {
  latitude = signal<number | null>(null);
  longitude = signal<number | null>(null);
  watchId: string | null = null;
  errorMsg = signal<string | null>(null);

  constructor(private loc: LocationService) {}

  async ngOnInit() {
    await this.loc.ensurePermissions();
    await this.obtenerUbicacionActual();
    await this.iniciarSeguimiento();
  }

  async obtenerUbicacionActual() {
    try {
      const pos = await this.loc.getCurrentPosition();
      this.latitude.set(pos.coords.latitude);
      this.longitude.set(pos.coords.longitude);
      this.errorMsg.set(null);
    } catch (e: any) {
      this.errorMsg.set(e?.message ?? 'Error al obtener la ubicación actual');
    }
  }

  async iniciarSeguimiento() {
    try {
      this.watchId = await this.loc.watchPosition((pos: Position) => {
        this.latitude.set(pos.coords.latitude);
        this.longitude.set(pos.coords.longitude);
      }, (err: any) => {
        this.errorMsg.set(err?.message ?? 'Error en seguimiento de ubicación');
      });
    } catch (e: any) {
      this.errorMsg.set(e?.message ?? 'No se pudo iniciar el seguimiento');
    }
  }

  async detenerSeguimiento() {
    if (this.watchId) {
      await this.loc.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  ngOnDestroy() {
    if (this.watchId) this.loc.clearWatch(this.watchId);
  }
}
