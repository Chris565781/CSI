import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-nade-map',
  templateUrl: './nade-map.component.html',
  styleUrls: ['./nade-map.component.css']
})
export class NadeMapComponent implements OnInit {
  options = {
    layers: [
      tileLayer('../../assets/img/ESEA.png', {
        maxZoom: 0,
        attribution: '...'
      }),
      marker([10, 10]),
    ],
    zoom: 1,
    center: latLng(46.879966, -121.726909)
  };

  constructor() {}

  ngOnInit() {}
}
