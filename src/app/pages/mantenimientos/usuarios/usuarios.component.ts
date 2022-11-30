import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public desde: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public cargando: boolean = true;
  public imgSubscribe: Subscription;
  constructor(
    private _usuarioService: UsuarioService,
    private _busquedaService: BusquedasService,
    private _modalService:ModalImagenService) {
      this.imgSubscribe = new Subscription;
    }
  ngOnDestroy(): void {
    this.imgSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubscribe = this._modalService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde <= 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }
  buscar(busqueda:string): any{
    if(busqueda.length === 0){
      return this.usuarios= this.usuariosTemp;
    }
    this._busquedaService.busqueda('usuarios',busqueda).subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminarUsuario( usuario:Usuario ):any {
    if( usuario.uid === this._usuarioService.uid){
      return Swal.fire('Error','No puede eliminar ese usuario', 'error')
    }
    Swal.fire({
      title: 'Eliminar',
      text: `Esta seguro que desea eliminar el usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.eliminarUsuario(usuario).subscribe( (resp:any) => {
          this.cargarUsuarios();
          Swal.fire(
            'Éxito!',
            `${resp.msg}`,
            'success'
            )
          })
      }
    })
  }

  cambiarRole( usuario:Usuario) {
    this._usuarioService.guardarUsuario(usuario).subscribe( respuesta => {
      console.log(respuesta)
    }, (err) => {
      Swal.fire('Error',err.error.msn, 'error')
    })
  }

  abrirModal( usuario:Usuario) {
    this._modalService.abrirModal('usuarios',usuario.uid, usuario.img)
  }
}
