import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, RootRenderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

import { Hospital } from 'src/models/hospitales.models';
import { Medico } from 'src/models/medicos.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor( private fb: FormBuilder,
               private hospitalesSetvices: HospitalService,
               private medicoServices: MedicoService,
               private router: Router,
               private activateRouter: ActivatedRoute ) { }

  ngOnInit(): void {


      console.log( 'Entro en la pagina del medicos');

      this.activateRouter.params.subscribe( ( { id })  => {
        console.log( 'params' + id);
        this.cargarMedicos(id);

      });

      this.medicoForm = this.fb.group ({
          nombre: [ 'Hernando', Validators.required],
          hospital: ['', Validators.required ],

      });

      this.cargarHospitales();

      this.medicoForm.get('hospital').valueChanges
          .subscribe( hospitalId => {
            this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
          });
  }

  cargarMedicos( id: string) {

      if ( id === 'nuevoMedico') {
        return;
      }
      this.medicoServices.obtenerMedicoporId(id)
         .pipe(
           delay(1000)
         )
         .subscribe( medico => {
           if ( !medico ) {
             return this.router.navigateByUrl(`/dashboard/medicos`);
           }
           const { nombre, hospital: {  _id } } = medico;

           this.medicoSeleccionado = medico;
           this.medicoForm.setValue ( {nombre, hospital: _id} );

         });
  }

  guardarMedico() {

    const { nombre } = this.medicoForm.value;
    if ( this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };
      this.medicoServices.actualizarMedico( data)
         .subscribe ( resp => {
          Swal.fire ( `Creado el médico ${nombre}`, 'success' );
         });

    } else {
      this.medicoServices.crearMedicos(this.medicoForm.value )
          .subscribe( (resp: any ) => {
            Swal.fire ( `Creado el médico ${nombre}`, 'success' );
            this.router.navigateByUrl(`/dashboard/medico/${resp.msg._id}`);
          }) ;
    }
  }

  cargarHospitales() {
    this.hospitalesSetvices.cargarHospitales()
        .subscribe ( (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
        });
  }

}
