import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      this.getUsuario().then( usuario => {
        console.log( 'Usuarios: ' , usuario);
      });
      /*
         Ejmeplo de  una promesa Simple
      */
      /*
      const promesa = new Promise ( ( resolve, reject  ) => {
        if ( false ) {
          resolve( 'Hola mundo ');
        } else {
          reject('uppps algo salio mal');
        }
      });

      promesa.then( ( mensaje ) => {
        console.log(mensaje);
      })
      .catch( (error) => {
        console.log (error);
      })
       console.log('Fin del Init');
      */
  }

  /* Ejempo de una funcion Promesa */
  getUsuario() {
    /*
    fetch('https://reqres.in/api/users?page=2')
        .then( resp =>  {
          resp.json().then( body => console.log(body) )
        } );
    */
    /* Otra forma mas Sencilla */
      const promesa = new Promise ( resolve => {
          fetch('https://reqres.in/api/users?page=2')
            .then( resp => resp.json() )
            .then( body => console.log(body.data) );
      });
      return promesa;

  }
}
