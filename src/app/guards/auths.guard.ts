import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthsGuard implements  CanActivate {

    constructor( private usuarioService: UsuarioService,
                 private router: Router ) {}

    canActivate(
       next: ActivatedRouteSnapshot,
       state: RouterStateSnapshot ) {

       return this.usuarioService.validarToken()
          .pipe(
            tap( estaAutenticado => {
              if (!estaAutenticado) {
                  this.router.navigateByUrl('/login');
              }
            })
          );
   }
}
