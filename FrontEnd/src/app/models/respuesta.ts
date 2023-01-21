export class Respuesta{
    id?:number;
    descripcion?:string;
    esCorrecta?:boolean;
    constructor(description:string,esCorrecta:boolean,id?:number) {
        this.descripcion=description;
        this.esCorrecta=esCorrecta;
        this.id=id;
    }
}