/* Modulos */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
/* Servicios */
import { AuthsGuard } from '../guards/auths.guard';

/* Rutas */
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from '../components/rxjs/rxjs.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthsGuard ],
       children: [
          { path: '', component: DashboardComponent, data: {titulo: 'DashBoard'} },
          { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}  },
          { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas #1'}},
          { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Cuenta'}},
          { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
          { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Promesas'}}
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
