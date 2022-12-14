import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private _http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get header(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  private transformarUsuario( resultados: any[]): Usuario[] {

    return resultados.map(
      user=> new Usuario(user.nombre, user.email, '', user.img, user.role,user.google, user.uid)
    );
  }

  busqueda(
    tipo: 'hospitales'|'medicos'|'usuarios',
    termino:string
    ){
    const url =`${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this._http.get<any[]>(url,this.header).pipe(
      map((resp:any)=>{
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuario(resp.resultado);
        
          default:
            return[]
        }
      })
    )

  }
}
