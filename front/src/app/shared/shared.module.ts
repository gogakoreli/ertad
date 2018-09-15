import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from './material.module';

const exportComponents = [CardComponent];

@NgModule({
  declarations: [...exportComponents],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [...exportComponents, MaterialModule, FlexLayoutModule],
  providers: [],
})
export class SharedModule {}
