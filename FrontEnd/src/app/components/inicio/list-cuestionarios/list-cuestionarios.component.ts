import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent {
  loading=false;
  listCuestionarios:any[]=[];

  constructor(private cuestionarioService:CuestionarioService,private router:Router,private res_cues_service:RespuestaCuestionarioService) {
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
    this.router.navigate(['/inicio/ingresarNombre']);
  }
}
