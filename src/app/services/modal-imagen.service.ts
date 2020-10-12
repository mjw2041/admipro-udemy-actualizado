import { ThrowStmt } from '@angular/compiler';
import { Injectable, EventEmitter } from '@angular/core';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private  _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public img: string;
  public id: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal( tipo: 'usuarios' | 'medicos' | 'hospitales',
              id: string,
              img: string = 'X'
    ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if ( img .includes('https')) {
      this.img = img;
    } else {
        this.img = `${ base_url}/upload/${tipo}/${img}`;
    }

    console.log(tipo);
    console.log(id);
    console.log(img);
    console.log(this.img);
  }

  cerrarModal() {
    this._ocultarModal = true;
  }


  constructor() { }
}
