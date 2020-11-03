import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Rutas */
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RxjsComponent } from '../components/rxjs/rxjs.component';

/* Mentenimientos*/
import { AdminGuard } from '../guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const childRoutes: Routes = [
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

  { path: 'usuarios', canActivate: [ AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios de Aplicacion'}}
];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
