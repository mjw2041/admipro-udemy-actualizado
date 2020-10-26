import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusquedasService } from 'src/app/services/busquedas.service';


import { Hospital } from 'src/models/hospitales.models';
import { Medico } from 'src/models/medicos.models';
import { Usuario } from 'src/models/usuario.models';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital [] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService ) { }

  ngOnInit() {
     this.activatedRoute.params
          .subscribe( ({ termino })  => this.busquedaGlobal(termino) );
  }

  busquedaGlobal( termino: string) {
      console.log('termino busqueda' + termino );
      this.busquedasService.busqudaGlobal( termino)
          .subscribe ( (resp: any) => {
            console.log(resp);
            console.log(resp.usuario);
            this.usuarios = resp.usuario;
            this.medicos = resp.medico;
            this.hospitales = resp.hospital;
          });
  }

  abrirMedico( medico: Medico) {
    console.log(medico);
  }

}
