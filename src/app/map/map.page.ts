import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  constructor() {}

  latitude: number;
  longitude: number;

  ngOnInit() {
    this.loadCurrentPosition();
  }

  async loadCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;

    this.loadMap();
  }

  loadMap() {
    setTimeout(() => {
      const map = L.map('map').setView([this.latitude, this.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      L.marker([this.latitude, this.longitude])
        .addTo(map)
        .bindPopup('Ola maeta c8!')
        .openPopup();

      map.invalidateSize();
    }, 100); // Asegúrate de que esto se ejecute después de que el DOM esté listo
  }
}
