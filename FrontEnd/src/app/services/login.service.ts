import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  AppUrl:string;
  ApiUrl:string;

  constructor(private http:HttpClient) { 
    this.AppUrl='https://localhost:7224';
    this.ApiUrl='/api/Login';
  }
  login(usuario:Usuario):Observable<any>{
    return this.http.post(this.AppUrl+this.ApiUrl,usuario);
  }
  setSession(data:string):void{
    localStorage.setItem('nombreUsuario',data);
  }
  getNombreUsuario():string|null{
    return localStorage.getItem('nombreUsuario');
  }
  removelocalStorage(){
    localStorage.removeItem('nombreUsuario');
  }
}
