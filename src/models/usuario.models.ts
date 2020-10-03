import { environment } from '../environments/environment';

const base_url = environment.base_url;

export class Usuario {

  constructor(
    public email: string,
    public nombre: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}

  mostrarNombre() {
    console.log(this.nombre);
  }

  get imagenUrl() {
    if ( this.img.includes( 'https') ) {
      return this.img;
    }
    if ( this.img ) {
      return `${ base_url}/upload/usuarios/${ this.img}`;
    } else {
      return `${ base_url}/upload/usuarios/no-image`;
    }
  }
}
