import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit {
  public usuario:Usuario;
  menuItems:any[]=[];
  constructor(private _sideBarService: SidebarService, private _userService: UsuarioService) {
    this.menuItems = this._sideBarService.menu;
    this.usuario = _userService.usuario;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this._userService.logout();
  }
}
