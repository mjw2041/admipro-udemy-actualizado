import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( private SettingsServices: SettingsService) { }

  ngOnInit() {
     this.SettingsServices.chekCurrentTheme();
  }

  changeTheme( theme: string) {
        this.SettingsServices.changeTheme(theme);
  }

}
