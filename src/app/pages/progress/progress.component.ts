import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

      progreso1: number = 70;
      progreso2: number = 50;
    constructor() {
    }

    ngOnInit() {
    }

    getProgreso1() {
      return `${ this.progreso1  }%`;
    }

    getProgreso2() {
      return `${ this.progreso2  }%`;
    }
/*  Se remplaza por la asignacion directa */

    cambioValorHijo( valor: number) {
      console.log('Recibi el valor: ' + valor);
      this.progreso1 = valor;
    }
}
