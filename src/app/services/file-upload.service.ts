import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  async actualizaFoto(
    archivo:File,
    tipo: 'hospitales'|'medicos'|'usuarios',
    id:string
  ){
    try {
    const url = `${base_url}/upload/${tipo}/${id}`;
    const formData = new FormData();
    formData.append('imagen', archivo);
    const respuesta = await fetch(url,{
      method:'PUT',
      headers:{
        'x-token': this.token
      },
      body: formData
    });
    const data = await respuesta.json();
    if(data.ok) {
      return data.nombreArchivo
    } else {
      console.log(data)
      return false
    }
      
    } catch (error) {
      console.error(error);
      return false;
    }

  }

}
