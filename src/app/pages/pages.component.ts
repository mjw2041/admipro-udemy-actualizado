import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions();
/* Declarar una funcin externa */

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor( private settingService: SettingsService,
               private sidebarServices: SidebarService) { }

  ngOnInit() {
    customInitFunctions();
    this.sidebarServices.cargarMenu();
    console.log('pages.components');
    console.log(this.sidebarServices.menu);
  }

}
