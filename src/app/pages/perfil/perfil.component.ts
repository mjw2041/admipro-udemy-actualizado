import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/models/usuario.models';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder ,
               private usuarioService: UsuarioService,
               private fileUlploadsService: FileUploadService ) {
        this.usuario = usuarioService.usuario;
  }

  ngOnInit() {
      this.perfilForm = this.fb.group( {
        nombre: [this.usuario.nombre, Validators.required ],
        email: [ this.usuario.email, [ Validators.required, Validators.email] ]
      });
  }

  actualizarPerfil() {
    console.log( this.perfilForm.value);
    this.usuarioService.actualizarPerfil( this.perfilForm.value)
        .subscribe ( resp => {
          const { nombre, email} = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          Swal.fire ( 'Guardados', 'Los cambios fueron guardados', 'success');
        }, ( err ) => {
          Swal.fire ( 'Error', err.error.msg, 'error');
        } );
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if ( !file) {
        return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL ( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    this.fileUlploadsService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid)
      .then( img => {
        this.usuario.img = img;
        Swal.fire ( 'Guardados', 'Los cambios fueron guardados', 'success');
      }).catch (err => {
        console.log(err);
        Swal.fire ( 'Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
