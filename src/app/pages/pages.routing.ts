/* Modulos */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Rutas */
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
       children: [
          { path: '', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent  },
          { path: 'graficas1', component: Graficas1Component},
       ]

 },
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
