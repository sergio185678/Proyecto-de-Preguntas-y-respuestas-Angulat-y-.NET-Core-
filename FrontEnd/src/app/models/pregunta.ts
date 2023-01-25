import { Respuesta } from "./respuesta";

export class Pregunta{
    descripcion?:string;
    listRespuestas?:Respuesta[];
    hide?:boolean;
    constructor(descripcion:string,listrespuestas:Respuesta[]){
        this.descripcion=descripcion;
        this.listRespuestas=listrespuestas;
        this.hide=true;
    }
}