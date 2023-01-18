import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit{
  nombreUsuario?:string|null;
  constructor(private loginService:LoginService){}
  ngOnInit(){
    this.getNombreUsuario();
  }
  getNombreUsuario(){
    this.nombreUsuario= this.loginService.getNombreUsuario();
  }
}
