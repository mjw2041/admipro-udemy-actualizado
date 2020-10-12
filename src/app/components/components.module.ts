import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule} from 'ng2-charts';


import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModelImagenComponent } from './model-imagen/model-imagen.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModelImagenComponent
  ],

  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ],

  exports: [
     IncrementadorComponent,
     DonaComponent,
     ModelImagenComponent
  ]
})

export class ComponentsModule { }
