import { Usuario } from 'src/models/usuario.models';

export interface CargarUsuario {
    totalUsuarios: number;
    usuarios: Usuario[];
}
