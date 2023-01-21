import { Pregunta } from "./pregunta";

export class Cuestionario{
    id?:number;
    nombre?:string;
    descripcion?:string;
    fechaCreacion?:Date;
    listPreguntas?:Pregunta[];
    constructor(nombre:string,descripcion:string,fechacreacion:Date,listpreguntas:Pregunta[]) {
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.fechaCreacion=fechacreacion;
        this.listPreguntas=listpreguntas;
    }
}