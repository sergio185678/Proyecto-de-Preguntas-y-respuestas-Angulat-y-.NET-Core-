import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
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
    localStorage.setItem('token',data);
  }
  removelocalStorage(){
    localStorage.removeItem('token');
  }
  getTokenDecoded(){
    const helper=new JwtHelperService();
    const token=localStorage.getItem('token');
    if(typeof token == 'string') {
      const decoderToken=helper.decodeToken(token);
      return decoderToken;
    }
    return null;
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
