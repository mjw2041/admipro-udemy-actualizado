import { Component} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.components.css']
})
export class RegisterComponent {

  public formsSubmitted = false;


  public registerForm = this.fb.group({
    nombre: [ 'Maximilano', [ Validators.required, Validators.minLength(3)]],
    email: [ 'mweihmuller72@hotmail.com', [ Validators.required, Validators.email] ],
    password: [ '1234', Validators.required],
    password2: [ '1234', Validators.required],
    terminos: [ true , Validators.required]
  } , {
    validators: this.passwordIguales( 'password', 'password2' )
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router
               ) {}

  crearUsuario() {
      this.formsSubmitted = true;

      if ( this.registerForm.invalid) {
        return;
      } else {
        console.log('el formulario es invalido');
        // Ralizar el llamado al servicio que crea el usuario.
        this.usuarioService.crearUsuario( this.registerForm.value )
            .subscribe ( res => {
                Swal.fire('Ingreso', 'Usuario Ingresado Correctamente', 'success');
                /// Navegar al DASHBOARD
                this.router.navigateByUrl('/');
            }, ( err) => {
                /// Si sucede el error
                Swal.fire('Error', err.error.msg, 'error');
            });
      }
  }

  campoValido( campo: string ): boolean {
      if ( this.registerForm.get(campo).invalid && this.formsSubmitted ) {
        return true;
      } else {
        return false;
      }
  }

  aceptaTerminos() {
    return ( !this.registerForm.get('terminos').value && this.formsSubmitted );
  }

  contrasenasNoValidas() {

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (  ( pass1 !== pass2 ) &&  this.formsSubmitted  ) {
        return true;
    } else {
        return false;
    }
  }
  passwordIguales( pass1Name: string, pass2Name: string) {
      return ( formsGroup: FormGroup ) => {
        const pass1Control = formsGroup.get(pass1Name);
        const pass2Control = formsGroup.get(pass2Name);
        if ( pass1Control.value  === pass2Control.value ) {
            pass2Control.setErrors(null);
        } else {
          pass2Control.setErrors( { noEsIgual: true } );
        }
      };
  }
}
