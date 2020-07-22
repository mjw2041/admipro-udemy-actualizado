import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  } from 'protractor';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // @Input() progreso: number = 50;

  /* Renombrar el Patametro */
  @Input('valor') progreso: number = 50;

  /* @Output() valorSalida: EventEmitter<number> = new EventEmitter<number>();*/

  /* Renombrar el Patametro */
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter<number>();
  @Input() btnClass: string = 'btn-primary';

  constructor() { }

  ngOnInit() {

    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor( valor: number ) {
    if ( this.progreso >= 100 && valor >= 0 ) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if ( this.progreso <= 0 && valor <= 0 ) {
      this.valorSalida.emit(100);
      return this.progreso = 0;
    }

    this.valorSalida.emit(this.progreso + valor);
    return this.progreso = this.progreso + valor;
  }

  onChange(nextValue: number) {

        if ( nextValue >= 100 ) {
            this.progreso = 100;

        } else if ( nextValue <= 0) {
          this.progreso = 0;
        } else {
          this.progreso = nextValue;
        }
        console.log('El valor es  ' + this.progreso);
        this.valorSalida.emit( this.progreso);
  }
}
