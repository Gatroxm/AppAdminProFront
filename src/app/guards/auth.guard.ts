import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private _usuarioService: UsuarioService, private _router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this._usuarioService.validaToken().pipe(
        tap( isAuthenticated =>{
          if(!isAuthenticated){
            this._router.navigateByUrl('/login')
          }
        })
      )
  }
  
}
