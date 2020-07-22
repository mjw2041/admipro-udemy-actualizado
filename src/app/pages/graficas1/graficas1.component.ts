import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  public data1 =  [ [100, 300, 200] ];
  public title =  'Ventas WEB';
  public label1 = ['Pequeña Venta', 'Madiana Venta', 'Grandes Ventas'];

  constructor() { }

  ngOnInit() {
  }
}
