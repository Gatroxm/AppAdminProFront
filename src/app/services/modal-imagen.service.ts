import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal:boolean = true;
  public tipo:'hospitales'|'medicos'|'usuarios' = 'usuarios';
  public id:string ='';
  public img:string = '';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal():boolean {
    return this._ocultarModal;
  }
  abrirModal(
    tipo: 'hospitales'|'medicos'|'usuarios',
    id:string ='',
    img: string = 'no-img'
   ){
    this.tipo = tipo;
    this.id = id;
    this._ocultarModal = false;
    if( img.includes('https')){
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }
  cerrarModal(){
    this._ocultarModal = true;
  }
}
