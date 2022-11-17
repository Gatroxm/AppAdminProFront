import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');
  constructor() {
    this.linkTheme?.setAttribute('href', localStorage.getItem('theme') || './assets/css/colors/default-dark.css')
  } 

  changeTheme(value:string) {
    const url=`./assets/css/colors/${value}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme()
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    links.forEach((el:any) => {
      el.classList.remove('working');
      const btnTheme = el.getAttribute('data-theme')
      const btnUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      if(btnUrl === currentTheme){
        el.classList.add('working');
      }
    });
  }
}
