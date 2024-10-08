import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;

  mapOptions: google.maps.MapOptions = {
    zoom: 15,
    disableDefaultUI: true,
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  constructor() {}

  ngOnInit(): void {}
}
