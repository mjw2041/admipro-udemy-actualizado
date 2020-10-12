import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-model-imagen',
  templateUrl: './model-imagen.component.html',
  styles: []
})
export class ModelImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService,
               public fileUlploadsService: FileUploadService ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if ( !file) {
        return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL ( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUlploadsService
      .actualizarFoto( this.imagenSubir, tipo, id)
      .then( img => {
        Swal.fire ( 'Guardados', 'Los cambios fueron guardados', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();

      }).catch (err => {
        console.log(err);
        Swal.fire ( 'Error', 'No se pudo subir la imagen', 'error');
      });
  }


}
