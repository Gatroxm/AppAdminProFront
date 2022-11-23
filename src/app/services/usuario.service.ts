import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario:Usuario = new Usuario("","");
  constructor(private _http: HttpClient, private _router: Router) {
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  logout(){
    localStorage.removeItem('token');
    if( this.usuario.google){

      return google.accounts.id.revoke( this.usuario.email, ()=>{
        this._router.navigateByUrl('/login')
      });
    }
    this._router.navigateByUrl('/login')
  }

  validaToken(): Observable<boolean> {
    
    return this._http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token': this.token
      }
    }).pipe(
      map((rep: any) => {
        console.log(rep)
        const { email,google,img='',nombre,role,uid} = rep.usuario;
        this.usuario = new Usuario(nombre,email,'',img,role,google, uid);
        this.usuario.imprimirNombre();
        localStorage.setItem('token', rep.token);
        return true;
      }),
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

  actualizarPerfil(data:{email: string, nombre:string, role:string}) {
    data = {
      ...data,
      role:this.usuario.role || ''
    }
    return this._http.put(`${base_url}/usuarios/${this.uid}`, data,
    {
      headers:{
        'x-token': this.token
      }
    });
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
