import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WebcamModule } from 'ngx-webcam';
import { CameraComponent } from './components/camera/camera.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from './material.module';

const exportComponents = [CardComponent, CameraComponent];

@NgModule({
  declarations: [...exportComponents],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, WebcamModule],
  exports: [
    ...exportComponents,
    MaterialModule,
    FlexLayoutModule,
    WebcamModule,
  ],
  providers: [],
})
export class SharedModule {}
