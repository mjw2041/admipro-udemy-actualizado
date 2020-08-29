import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.components.css']
})
export class LoginComponent implements OnInit {

  public formSubmited = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email] ],
    password: [ '1234', Validators.required],
    remenber: [ true ]

  } );

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }
  ngOnInit(): void {
    this.renderButton();
  }

  login() {

    this.usuarioService.login( this.loginForm.value )
       .subscribe ( res => {
             Swal.fire('Ingreso', 'Usuario Ingresado Correctamente', 'success');

             if ( this.loginForm.get('remenber').value ) {
              localStorage.setItem('email', this.loginForm.get('email').value);
             } else {
               localStorage.removeItem('email');
             }

             this.router.navigateByUrl('/');
       }, ( err) => {
          /// Si sucede el error
          Swal.fire('Error', err.error.msg, 'error');
    });
  }

  onSuccess(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;

    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    console.log('id_token ' + id_token);

  }

  onFailure( error ) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSuccess,
      onfailure: this.onFailure
    });

    this.startApp();
  }

  async startApp() {

      await this.usuarioService.googleInit();
      this.auth2 = this.usuarioService.auth2;
      this.attachSignin(document.getElementById('my-signin2') );
  }

  attachSignin(element) {
      this.auth2.attachClickHandler(element, {},
          (googleUser) => {
            /*
            document.getElementById('name').innerText = 'Signed in: ' +
                googleUser.getBasicProfile().getName();
           */
            const idTtoken = googleUser.getAuthResponse().id_token;
            this.usuarioService.loginGoogle(idTtoken)
            .subscribe ( resp => {
                       this.ngZone.run( () => {
                         /// Navegar al DASHBOARD
                         this.router.navigateByUrl('/');
                       });
            });

          }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
          });
    }






}


