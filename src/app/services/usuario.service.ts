import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';


import { RegisterForm } from '../interfaces/register-form-interfaces';
import { LoginForm } from '../interfaces/auth.interfaces';
import { Usuario } from 'src/models/usuario.models';
import { CargarUsuario } from '../interfaces/cargar-usuarios-interfaces';
import Swal from 'sweetalert2';


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

  guardarLocalStorage(token: string, menu: any , desde: string ) {
    localStorage.setItem('token', token);
    console.log('guardarLocalStorage');
    console.log('desde ' + desde);
    console.log(menu);
    localStorage.setItem('menu', JSON.stringify(menu));
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
     localStorage.removeItem('menu');

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

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get headers() {
      return {
        headers: {
        'x-token': this.token
      }
    };
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }) .pipe(
      map (( resp: any ) => {

        const { email, google, nombre, role, img = '', identicador } = resp.usuario;
        this.usuario = new Usuario ( email, nombre, '', img, google, role, identicador );
        this.guardarLocalStorage (resp.token, resp.menu, 'validarToken');
        /*
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', resp.menu);
        */
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
        this.guardarLocalStorage (resp.token, resp.menu, 'crearUsuario');
        /*
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', resp.menu);
        */
      })/*,*/
      /*
      catchError( err => {
        Swal(err.error.mensaje, err.error.errors.message, 'error');
      })
      */
    );
  }

  actualizarPerfil( data: {email: string, nombre: string , role: string }) {
    data = {
      ...data,
      role: this.usuario.role
    };
    return this.http.put( `${ base_url }/usuarios/${this.uid}`, data, this.headers);
  }

  login( formData: LoginForm) {
    return this.http.post( `${ base_url }/login`, formData)
               .pipe (
                 tap( (resp: any) => {
                  this.guardarLocalStorage (resp.token, resp.menu, 'login');
                   /*
                   localStorage.setItem('token', resp.token);
                   localStorage.setItem('menu', resp.menu);
                   */
                 })
               );
  }

  loginGoogle(token ) {
    return this.http.post( `${ base_url }/login/google`, { token } )
               .pipe (
                 tap( (resp: any) => {
                   this.guardarLocalStorage (resp.token, resp.menu, 'loginGoogle');
                   /*
                   localStorage.setItem('token', resp.token);
                   localStorage.setItem('menu', resp.menu);
                   */
                 })
               );
  }

  cargarUsuarios( desde: number = 0 ) {
    /* localhost:3000/api/usuarios?desde=5*/
    const url = `${ base_url}/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers )
      .pipe (
        map ( resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario( user.email, user.nombre, '' , user.img, user.google, user.role, user.identicador)
          );
          return {
            totalUsuarios: resp.totalUsuarios,
            usuarios
          };
        })
      );
  }

  eliminarUsuario( usuario: Usuario) {

    const url = `${ base_url}/usuarios/${usuario.uid}` ;
    return this.http.delete( url, this.headers );

  }
/*
  guardarUsuario( usuario: Usuario ) {
    console.log(usuario);
    console.log(usuario.uid);
    console.log(this.headers);
    return this.http.put( `${ base_url }/usuarios/${usuario.uid}`, usuario, this.headers);
  }
*/
  guardarUsuario( usuario: Usuario ) {
    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );

  }
}


