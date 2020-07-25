import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions();
/* Declarar una funcin externa */

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor( private settingService: SettingsService) { }

  ngOnInit() {
    customInitFunctions();
  }

}
