import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';


import { RegisterForm } from '../interfaces/register-form-interfaces';
import { LoginForm } from '../interfaces/auth.interfaces';
import { Usuario } from 'src/models/usuario.models';


const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone  ) {
        this.googleInit();
  }

  googleInit() {
     return new Promise ( resolve => {
       console.log('google init');

       gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '1085361156544-am4r0tsv5cnmvadcid12s5hp9vh5ml3b.apps.googleusercontent.com',
        });
        resolve();
      });
     });
  }
  logout() {
     localStorage.removeItem('token');

     this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        console.log('User signed out.');
        this.router.navigateByUrl('/login');
      });
    });
  }

  get token() {
      return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || ' ';
  }

  validarToken(): Observable<boolean> {


    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }) .pipe(
      map (( resp: any ) => {
        console.log('Respuesta del Servicio' );
        console.log(resp);
        const { email, google, nombre, role, img = '', identicador } = resp.usuario;
        console.log( 'email' +  email );
        console.log( 'nombre' +  nombre );
        console.log( 'identificador' +  identicador );
        console.log( 'identificado' +  resp.usuario.identificador );

        console.log( 'resp.usuario' +  resp.usuario );
        this.usuario = new Usuario ( email, nombre, '', img, google, role, identicador );
        localStorage.setItem('token', resp.token);
        return true;
      }),
      map ( resp => true ),
      catchError( error => of( false) )
    );
  }


  crearUsuario( formData: RegisterForm )  {
    return this.http.post( `${ base_url }/usuarios`, formData)
    .pipe (
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarPerfil( data: {email: string, nombre: string , role: string }) {
    data = {
      ...data,
      role: this.usuario.role
    };
    return this.http.put( `${ base_url }/usuarios/${this.uid}`, data,  {
      headers: {
        'x-token': this.token
      }
    });
  }

  login( formData: LoginForm) {
    return this.http.post( `${ base_url }/login`, formData)
               .pipe (
                 tap( (resp: any) => {
                   localStorage.setItem('token', resp.token);
                 })
               );
  }

  loginGoogle(  token ) {
    return this.http.post( `${ base_url }/login/google`, { token } )
               .pipe (
                 tap( (resp: any) => {
                   localStorage.setItem('token', resp.token);
                 })
               );
  }
}
