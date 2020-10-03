import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService) {
        this.usuario = usuarioService.usuario;
  }

    logout() {
      this.usuarioService.logout();
    }
}
