import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario: Usuario;
  public profileFrom: FormGroup;
  public imagenSubir:File;
  public imgTemp:any = '';

  constructor( 
    private fb: FormBuilder, 
    private _usuarioService: UsuarioService,
    private _fileUpload: FileUploadService) {
    this.usuario = _usuarioService.usuario;
    this.imagenSubir = {} as File;
    this.profileFrom = this.fb.group({
      nombre: [_usuarioService.usuario.nombre, Validators.required],
      email: [_usuarioService.usuario.email, [Validators.required, Validators.email]]
    });

  }

  ngOnInit(): void {
    
  }

  actualizarPerfil(): void {
    this._usuarioService.actualizarPerfil(this.profileFrom.value).subscribe(data => {
      const {nombre, email} = this.profileFrom.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire('Guardado', 'Los cambios fueron guardados', 'success')
    }, err =>{
      console.log(err.error.msg)
      Swal.fire('Error', `${err.error.msg}`, 'error')
    })
  }
  cambiarImagen(event:any):any { 
    this.imagenSubir = event.target.files[0];
    if (!event.target.files[0]){
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result || null;
    }

  }
  subirImagen(){
    this._fileUpload.actualizaFoto(this.imagenSubir,'usuarios',this.usuario.uid || '').then(img=>{
      this.usuario.img = img
      Swal.fire('Guardado', 'Se actualizo la imagen correcta mente', 'success')
    }).catch(err=>{
      console.log(err.error.msg)
      Swal.fire('Error', `No sepudo subir la imagen`, 'error')
    })
  }
}
