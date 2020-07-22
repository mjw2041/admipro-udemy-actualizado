/// Modulos

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/* Modulo de Ruteo */
// import { AppRoutingModule } from '../app-routing.module';
import {RouterModule} from '@angular/router';


/// Modulos Personales
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

/// Componentes
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { PagesComponent } from '../pages/pages.component';





@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    RouterModule,
    ComponentsModule

    /* Forma paracrear las rutas  */
    // AppRoutingModule

  ]
})
export class PagesModule { }
