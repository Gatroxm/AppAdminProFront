import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario;
  constructor(private _userService: UsuarioService) {
    this.usuario = _userService.usuario;
  }

  ngOnInit(): void {
  }
  logout(): void {
    this._userService.logout();
  }
}
