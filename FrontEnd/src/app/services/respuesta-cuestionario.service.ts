import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuestionario } from '../models/cuestionario';
import { RespuestaCuestionario } from '../models/respuestaCuestionario';

@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {

  AppUrl:string;
  ApiUrl:string;

  nombreParticipante!:string;
  idCuestionario!:number;
  respuestas:number[]=[];
  cuestionario!:Cuestionario;

  constructor(private http:HttpClient) {
    this.AppUrl='https://localhost:7224';
    this.ApiUrl='/api/RespuestaCuestionario/';
  }
  guardarRespuestaCuestionario(respuestaCuestionario:RespuestaCuestionario):Observable<any>{
    return this.http.post(this.AppUrl+this.ApiUrl,respuestaCuestionario);
  }
  getRespuestaCuestionario(cuestionarioid:number):Observable<any>{
    return this.http.get(this.AppUrl+this.ApiUrl+cuestionarioid);
  }
  eliminarRespuestaCuestionario(rtaCues:number):Observable<any>{
    return this.http.delete(this.AppUrl+this.ApiUrl+rtaCues);
  }
  getCuestionariobyidres_cues(id:number):Observable<any>{
    return this.http.get(this.AppUrl+this.ApiUrl+"GetCuestionarioByIdRespuesta/"+id);
  }
}
