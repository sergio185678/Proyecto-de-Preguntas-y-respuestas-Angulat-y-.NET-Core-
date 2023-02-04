import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-respuesta-cuestionario',
  templateUrl: './respuesta-cuestionario.component.html',
  styleUrls: ['./respuesta-cuestionario.component.css']
})
export class RespuestaCuestionarioComponent {
  cuestionario!:Cuestionario;
  respuestas_usuario: number[]=[];

  constructor(private res_cues_service:RespuestaCuestionarioService,private router:Router){
    //veremos primero si ha completado el cuestionario y no se fue defrente al url este
    if(this.res_cues_service.idCuestionario==null){
      this.router.navigate(['/inicio']);
    }
    else{
      this.cuestionario=this.res_cues_service.cuestionario;
      this.respuestas_usuario=this.res_cues_service.respuestas;
      console.log(this.cuestionario);
      console.log(this.respuestas_usuario);
    }
  }
}
