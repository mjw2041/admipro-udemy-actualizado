import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.models';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  constructor( private usuarioService: UsuarioService,
               private busquedasServices: BusquedasService,
               private modalImagenServices: ModalImagenService
               ) { }
  public totalUsuarios: number;
  public usuarios: Usuario [];
  public usuariosTemp: Usuario[];
  public desde: number = 0;
  public cargando: boolean = true;
  public imagenSubs: Subscription;

  ngOnDestroy() {
    this.imagenSubs.unsubscribe();
  }

  ngOnInit(): void {
      this.cargarUsuario();
      this.imagenSubs = this.modalImagenServices.nuevaImagen
      .pipe(
        delay(200)
      )
      .subscribe ( img => {
           this.cargarUsuario();
        });
  }

  cargarUsuario() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde)
        .subscribe( ({ totalUsuarios , usuarios}) => {
          this.totalUsuarios = totalUsuarios;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        });
  }

  cambiarPagina( valor: number) {
       this.desde += valor;
       if ( this.desde < 0 ) {
         this.desde = 0;
       } else if ( this.desde >= this.totalUsuarios ) {
          this.desde -= valor;
       }
       this.cargarUsuario();
  }

  buscar( termino: string) {
      if ( termino.length === 0 ) {
        return this.usuarios = this.usuariosTemp;
      }
      console.log(termino);
      this.busquedasServices.buscar ('usuarios', termino)
         .subscribe ( resp => {
             console.log(resp);
             this.usuarios = resp;
       });
  }

  eliminarUsuario( usuario: Usuario ) {
    if ( usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No se pueden eliminarse a si mismo', 'error');
    }

    Swal.fire({
      title: 'Borrar Usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario( usuario)
        .subscribe ( resp => {
          console.log('Borrado Exitoso');
          this.cargarUsuario();
          Swal.fire(
            'Eliminado',
            'El registro se Elimino Exitosamente',
            'success'
          );
        });
      }
    });
  }

  cambiarRole( usuario: Usuario) {
      this.usuarioService.guardarUsuario ( usuario)
         .subscribe ( resp => {
           console.log(resp);
         });
  }

  abrirModal( usuario: Usuario) {
    console.log(usuario);
    this.modalImagenServices.abrirModal( 'usuarios', usuario.uid, usuario.img);
  }
}
