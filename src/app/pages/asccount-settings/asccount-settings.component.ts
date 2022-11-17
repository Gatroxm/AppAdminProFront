import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-asccount-settings',
  templateUrl: './asccount-settings.component.html',
  styleUrls: ['./asccount-settings.component.css']
})
export class AsccountSettingsComponent implements OnInit {
  public links:any;
  constructor( private _settingsService:SettingsService) { }

  ngOnInit(): void {
    
    this._settingsService.checkCurrentTheme()
  }

  changeTheme(value:string) {
    this._settingsService.changeTheme(value);
  }

  

}
