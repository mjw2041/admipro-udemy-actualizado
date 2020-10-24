import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Medico  } from 'src/models/medicos.models';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class MedicoService {

  constructor( private http: HttpClient) { }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
      'x-token': this.token
      }
    };
  }

  cargarMedicos( ) {

      const url = `${ base_url}/medicos`;
      return this.http.get( url, this.headers )
         .pipe (
           map ( ( resp: { ok: boolean, medicos: Medico[] }) => resp.medicos )
         );
  }

  obtenerMedicoporId( id: string )  {
    const url = `${ base_url}/medicos/${id}`;
    return this.http.get( url, this.headers )
       .pipe (
         map ( ( resp: { ok: boolean, medico: Medico }) => resp.medico )
       );
  }

  crearMedicos( medico: { nombre: string, hospital: string }  ) {
    const url = `${ base_url}/medicos`;
    return this.http.post( url, medico, this.headers );
  }

  actualizarMedico( medico: Medico ) {
    const url = `${ base_url}/medicos/${medico._id}`;
    return this.http.put( url, medico, this.headers );
  }

  borrarMedico(id: string) {
    const url = `${ base_url}/medicos/${id}`;
    console.log(id);
    return this.http.delete( url, this.headers );
  }

}
