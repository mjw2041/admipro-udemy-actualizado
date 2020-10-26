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
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { RxjsComponent } from '../components/rxjs/rxjs.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthsGuard ],
       children: [
          { path: '', component: DashboardComponent, data: {titulo: 'DashBoard'} },
          { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Cuenta'}},
          { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busquedas'}},
          { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas #1'}},
          { path: 'perfil', component: PerfilComponent , data: {titulo: 'Perfil de la Persona'}},
          { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}  },
          { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
          { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Promesas'}},
          /// Mantenimientos
          { path: 'medicos', component: MedicosComponent , data:  { titulo: 'Mantenimiento de Medicos' }},
          { path: 'medico/:id', component: MedicoComponent , data:  { titulo: 'Medicos' }},
          { path: 'hospitales', component: HospitalesComponent , data:  { titulo: 'Mantenimiento de Hospitales' }},
          /* Rutas de Administracion  */

          { path: 'usuarios', canActivate: [ AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios de Aplicacion'}},
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
