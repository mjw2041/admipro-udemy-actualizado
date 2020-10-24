import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import { Medico } from 'src/models/medicos.models';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = false;
  public medicos: Medico [] = [];
  public imagenSubs: Subscription;

  constructor( private medicosService: MedicoService,
               private busquedasServices: BusquedasService,
               private modalImagenServices: ModalImagenService ) { }

  ngOnDestroy() {
      this.imagenSubs.unsubscribe();
  }

  ngOnInit() {
      this.cargarMedicos();

      this.imagenSubs = this.modalImagenServices.nuevaImagen
      .pipe(
        delay(200)
      )
      .subscribe ( img => {
           this.cargarMedicos();
        });
  }

  buscar( termino: string) {
    if ( termino.length === 0 ) {
      this.cargarMedicos();
    } else {
      console.log(termino);
      this.busquedasServices.buscar ('medicos', termino)
         .subscribe ( resp => {
             console.log(resp);
             this.medicos = resp;
       });
    }
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicosService.cargarMedicos()
        .subscribe ( medicos => {
          this.cargando = false;
          console.log(medicos);
          this.medicos = medicos;
        });
  }

  abrirModal( medico: Medico) {
    this.modalImagenServices.abrirModal( 'medicos', medico._id, medico.img);
  }

  borrarMedico( medico: Medico) {
    Swal.fire({
      title: 'Borrar Medico?',
      text: `Esta a punto de borrar a ${ medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('id del medico a eliminar ' + medico._id);
        this.medicosService.borrarMedico( medico._id)
        .subscribe ( resp => {
          console.log('Borrado Exitoso');
          this.cargarMedicos();
          Swal.fire(
            'Eliminado',
            `El medico ${ medico.nombre } se eliminó Exitosamente`,
            'success'
          );
        });
      }
    });
  }

}
