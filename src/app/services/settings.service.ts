import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public linkTheme = document.querySelector('#theme');

  constructor() {
     console.log('Servicio setting');
     const url: string = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
     /* || -> si viene nulo uso el segundo parametro */
     this.linkTheme.setAttribute('href', url);
  }

  changeTheme( theme: string) {
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem( 'theme', url );

    this.chekCurrentTheme();
  }

  chekCurrentTheme() {

    const links = document.querySelectorAll('.selector');

    links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
      if ( currentTheme === btnThemeUrl ) {
        element.classList.add('working');
      }
    });
}



}
