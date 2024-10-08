import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {
  @Output() pictureTaken = new EventEmitter<WebcamImage>();

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string = '';
  public videoOptions: MediaTrackConstraints = {};
  public errors: WebcamInitError[] = [];

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor() {}

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    const image = new Image();
    image.src = webcamImage.imageAsDataUrl;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = image.width;
      canvas.height = image.height;

      context?.translate(canvas.width, 0);
      context?.scale(-1, 1);

      context?.drawImage(image, 0, 0);

      const flippedImageAsDataUrl = canvas.toDataURL();
      const flippedWebcamImage = new WebcamImage(
        flippedImageAsDataUrl,
        webcamImage.imageAsBase64,
        webcamImage.imageData
      );

      this.pictureTaken.emit(flippedWebcamImage);
    };
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
