import { environment } from "src/environments/environment";

const base_url = environment.base_url;
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public uid?: string,
    ){}
    imprimirNombre(){
        console.log(this.nombre);
    }

    get imagenUrl() {
        //upload/usuarios/c70e89d5-25ea-47f5-bfcb-8e4d09355.jpg
        if(!this.img){
            return `${base_url}/upload/usuarios/no-image`;
        } else if(this.img?.includes('https')){
            return this.img;
        } else if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`;
        }else {
            return `${base_url}/upload/usuarios/no-image`;
        }
    }
    get propertyGoogle() {
        if(this.google){
            return true;
        } else {
            return false;
        }
    }
}