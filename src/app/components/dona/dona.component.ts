import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {

  @Input()  title = ' ';
  @Input() data: MultiDataSet = [ [350, 450, 100] ];

  @Input() labels: Label[] = ['Venta Web', 'En el local', 'Via Mail'];

  public colors: Color[] = [
    { backgroundColor: [ '#6857E6', '#009FEE' , '#F02059' ]  }
  ];

  constructor() { }

  ngOnInit() {
  }

}
