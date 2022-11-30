import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir:File;
  public imgTemp:any = '';

  constructor( 
    public _modalService: ModalImagenService,
    private _fileUpload: FileUploadService) {
    this.imagenSubir = {} as File;
  }

  ngOnInit(): void {
  }
  cerrarModal() {
    this.imgTemp = null;
    this._modalService.cerrarModal()
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
    const id = this._modalService.id
    const tipo = this._modalService.tipo
    this._fileUpload.actualizaFoto(this.imagenSubir,tipo,id).then(img=>{
      Swal.fire('Guardado', 'Se actualizo la imagen correcta mente', 'success');
      this._modalService.nuevaImagen.emit(img)
      this.cerrarModal();
    }).catch(err=>{
      console.log(err.error.msg)
      Swal.fire('Error', `No sepudo subir la imagen`, 'error')
    })
  }
}
