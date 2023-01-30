import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuestionario } from '../models/cuestionario';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  AppUrl:string;
  ApiUrl:string;
  tituloCuestionario?:string;
  descripcionCuestionario?:string;
  constructor(private http:HttpClient) {
    this.AppUrl='https://localhost:7224';
    this.ApiUrl='/api/Cuestionario/';
  }
  guardarCuestionario(cuestionario:Cuestionario):Observable<any>{
    return this.http.post(this.AppUrl+this.ApiUrl,cuestionario);
  }
  getListCuesitonariobyUser():Observable<any>{
    return this.http.get(this.AppUrl+this.ApiUrl+"GetListCuestionariosByUser");
  }
  deleteCuestionario(idCuestionario:number|undefined):Observable<any>{
    return this.http.delete(this.AppUrl+this.ApiUrl+idCuestionario);
  }
  getCuestionario(idCuestionario:number|undefined):Observable<any>{
    return this.http.get(this.AppUrl+this.ApiUrl+idCuestionario);
  }
  getListCuestionarios():Observable<any>{
    return this.http.get(this.AppUrl+this.ApiUrl+"GetListCuestionario");
  }
}
