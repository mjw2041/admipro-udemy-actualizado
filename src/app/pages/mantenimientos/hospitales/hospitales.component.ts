import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from 'src/models/hospitales.models';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService} from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital [] = [];
  public hospitalesTemp: Hospital [] = [];
  public cargando: boolean = true;
  public imagenSubs: Subscription;

  constructor( private hospitalServices: HospitalService,
               private modalImagenServices: ModalImagenService,
               private busquedasServices: BusquedasService ) { }
  ngOnDestroy() {
       this.imagenSubs.unsubscribe();
  }


  ngOnInit(): void  {
        this.cargarHospitales();
        this.imagenSubs = this.modalImagenServices.nuevaImagen
      .pipe(
        delay(200)
      )
      .subscribe ( img => {
           this.cargarHospitales();
        });
  }

  buscar( termino: string) {
    if ( termino.length === 0 ) {
      this.cargarHospitales();
    } else {
      console.log(termino);
      this.busquedasServices.buscar ('hospitales', termino)
         .subscribe ( resp => {
             console.log(resp);
             this.hospitales = resp;
       });
    }
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalServices.cargarHospitales()
        .subscribe ( hospitales => {
          this.cargando = false;
          this.hospitales = hospitales;
        });
  }

  guardarCambios( hospital: Hospital) {
    this.hospitalServices.actualizarHospital ( hospital._id, hospital.nombre)
        .subscribe ( resp => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        });

  }

  eliminarHospital( hospital: Hospital) {
    this.hospitalServices.borrarHospital ( hospital._id )
        .subscribe ( resp => {
          this.cargarHospitales();
          Swal.fire('Eliminado', hospital.nombre, 'success');
        });

  }

  async abrirSweetAlert() {
      const { value = '' } = await Swal.fire<string>({
        title: 'Crear hospital',
        text: 'Ingrese el nombre del nuevo hospital',
        input: 'text',
        inputPlaceholder: 'Nombre del hospital',
        showCancelButton: true,
      });

      if ( value.trim().length > 0 ) {
        this.hospitalServices.crearHospital( value )
          .subscribe( (resp: any) => {
            this.hospitales.push( resp.msg );
          });
      }
  }

  abrirModal( hospital: Hospital) {
    console.log(hospital);
    this.modalImagenServices.abrirModal( 'hospitales', hospital._id, hospital.img);
  }

}

