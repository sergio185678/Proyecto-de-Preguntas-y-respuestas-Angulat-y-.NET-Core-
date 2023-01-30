import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent {
  idCuestionario:number;

  constructor(private res_cues_service:RespuestaCuestionarioService,private cuestionarioservice:CuestionarioService,private router:Router){
    this.idCuestionario=this.res_cues_service.idCuestionario;
    if(this.idCuestionario==null){
      this.router.navigate(["/inicio"]);
      return;
    }
    this.getCuestionario();
  }

  getCuestionario(){
    this.cuestionarioservice.getCuestionario(this.idCuestionario).subscribe(data=>{
      console.log(data);
    })
  }
}
