import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-lista-de-cuestionarios',
  templateUrl: './lista-de-cuestionarios.component.html',
  styleUrls: ['./lista-de-cuestionarios.component.css']
})
export class ListaDeCuestionariosComponent {

  loading=false;
  listCuestionarios:any[]=[];

  constructor(private cuestionarioService:CuestionarioService,private router:Router,private res_cues_service:RespuestaCuestionarioService,private login_service:LoginService) {
    this.getListCuestionarios();
  }

  getListCuestionarios(){
    this.loading=true;
    this.cuestionarioService.getListCuestionarios().subscribe(data=>{
      this.loading=false;
      console.log(data[0].fechaCreacion)
      this.listCuestionarios=data;
    })
  }

  ingresarNombre(idCuestionario:number){
    this.res_cues_service.idCuestionario=idCuestionario;
    this.router.navigate(['/inicio/ListCuestionarios/ingresarNombre']);
  }

  volver(){
    if(this.login_service.getToken()==null){
      this.router.navigate(['/inicio']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }
}
