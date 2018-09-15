import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CameraComponent } from './components/camera/camera.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from './material.module';

const exportComponents = [CardComponent, CameraComponent];

@NgModule({
  declarations: [...exportComponents],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [...exportComponents, MaterialModule, FlexLayoutModule],
  providers: [],
})
export class SharedModule {}
