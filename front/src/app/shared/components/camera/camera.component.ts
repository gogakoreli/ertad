import {
  Component,
  EventEmitter,
  OnInit,
  Output
  } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  picture: File;
  pictureSrc: any;

  @Output()
  amount = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  takePicture(camera: HTMLInputElement) {
    camera.click();
  }

  change(event: Event) {
    const camera = event.target as HTMLInputElement;

    if (camera && camera.files && camera.files.length > 0) {
      this.picture = camera.files[0];

      var reader = new FileReader();

      reader.onload = (e: any) => {
        this.pictureSrc = e.target.result;

        this.amount.emit(22.5);
      };

      reader.readAsDataURL(this.picture);
    }
  }
}
