import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  constructor(private _userService: UsuarioService) { }

  ngOnInit(): void {
  }
  logout(): void {
    this._userService.logout();
  }
}
