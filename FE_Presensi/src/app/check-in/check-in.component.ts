import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { MapsComponent } from '../maps/maps.component';
import { KaryawanService } from '../service/karyawan.service';
import { PresensiService } from '../service/presensi.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})

export class CheckInComponent implements OnInit {
  presensiForm: FormGroup;
  webcamImage: WebcamImage | null = null;
  showWebcam = true;
  errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();

  latitude!: number;
  longitude!: number;
  presensiData: any[] = [];
  filteredPresensi: any[] = [];

  @ViewChild(MapsComponent) mapPicker!: MapsComponent;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private presensiService: PresensiService,
    private karyawanService: KaryawanService
  ) {
    this.presensiForm = this.fb.group({
      nik: ['', Validators.required],
      nama: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getLocation();
    this.fetchPresensis();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          this.presensiForm.patchValue({
            latitude: this.latitude,
            longitude: this.longitude
          });
        },
        (error) => {
          console.error('Error getting location: ', error);
          alert('Error getting location. Make sure your GPS is enabled and you have granted location permissions.');
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  fetchPresensis(): void {
    this.karyawanService.getKaryawan().subscribe(response => {
      if (response && response.data) {
        this.presensiData = response.data.map((item: any) => ({
          nik: item.nik,
          nama: item.nama,
        }));
        this.filteredPresensi = this.presensiData;
      }
    });
  }

  filterNama(event: any): void {
    const input = event.target.value.toLowerCase();
    this.filteredPresensi = this.presensiData.filter(p => p.nama.toLowerCase().includes(input));
  }

  onNamaSelected(event: any): void {
    const selectedNama = event.option.value;
    const selectedPresensi = this.presensiData.find(p => p.nama === selectedNama);

    if (selectedPresensi) {
      this.presensiForm.patchValue({
        nik: selectedPresensi.nik
      });
    }
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.showWebcam = false;
    this.presensiForm.patchValue({
      image: webcamImage.imageAsBase64
    });
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  base64ToBlob(base64: string, mimeType: string): Blob {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  }

  retakePicture(): void {
    this.webcamImage = null;
    this.showWebcam = true;
  }

  submitForm(): void {
    if (!this.webcamImage) {
      alert('No webcam image captured');
      return;
    }

    if (this.presensiForm.valid) {
      const formData = new FormData();
      formData.append('nik', this.presensiForm.get('nik')?.value);
      formData.append('nama', this.presensiForm.get('nama')?.value);
      formData.append('latitude', this.presensiForm.get('latitude')?.value);
      formData.append('longitude', this.presensiForm.get('longitude')?.value);

      const mimeType = this.webcamImage.imageAsDataUrl.split(';')[0].split(':')[1];
      const blob = this.base64ToBlob(this.webcamImage.imageAsDataUrl, mimeType);

      formData.append('image', blob, `image.${mimeType.split('/')[1]}`);

      this.presensiService.checkIn(formData).subscribe(
        (response) => {
          alert('Check-In berhasil');
          this.router.navigate(['/presensi']);
        },
        (error) => {
          if (error.error && error.error.message) {
            alert(error.error.error);
          } else {
            alert('Error during check-in process.');
          }
          console.error('Error:', error);
        }
      );
    }
  }
}
