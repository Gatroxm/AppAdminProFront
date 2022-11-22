import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private _http: HttpClient, private _router: Router) {}

  logout(){
    localStorage.removeItem('token');
    google.accounts.id.revoke( 'tavoxpau@gmail.com', ()=>{
      this._router.navigateByUrl('/login')
    })
  }

  validaToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this._http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token': token
      }
    }).pipe(
      tap((rep: any) => {
        localStorage.setItem('token', rep.token);
      }),
      map( resp=>true),
      catchError( err=> of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this._http.post(`${base_url}/usuarios`, formData).pipe(
      tap((rep: any) => {
        localStorage.setItem('token', rep.token);
      })
    );
  }
  login(formData: any) {
    return this._http.post(`${base_url}/login`, formData).pipe(
      tap((rep: any) => {
        localStorage.setItem('token', rep.token);
      })
    );
  }
  public loginGoogle(formData: any) {
    console.log('loginGoogle', formData);
    return this._http.post(`${base_url}/login/google`, formData).pipe(
      tap((rep: any) => {
        localStorage.setItem('token', rep.token);
      })
    );
  }
}
