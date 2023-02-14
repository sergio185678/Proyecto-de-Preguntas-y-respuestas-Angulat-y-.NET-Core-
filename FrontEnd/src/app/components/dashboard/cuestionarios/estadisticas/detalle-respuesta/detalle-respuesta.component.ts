import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent {
  idRespuesta_Cues:number=0;
  cuestionario!:Cuestionario;
  loading=false;
  respuestas:RespuestaCuestionarioDetalle[]=[];
  nombre_del_que_resolvio!:string;
  cant_res_co:number=0;

  constructor(private aroute:ActivatedRoute,private res_cues_service:RespuestaCuestionarioService){
    this.idRespuesta_Cues=+this.aroute.snapshot.paramMap.get('id')!;
    this.getListResyCues();
    this.getRespu_Cues();
  }

  getListResyCues(){
    this.loading=true;
    this.res_cues_service.getCuestionariobyidres_cues(this.idRespuesta_Cues).subscribe(data=>{
      this.cuestionario=data.cuestionario;
      this.respuestas=data.respuesta;
      this.loading=false;
      this.cantidad_res_corr();
    })
  }
  getRespu_Cues(){
    this.loading=true;
    this.res_cues_service.getResCuesbythisid(this.idRespuesta_Cues).subscribe(data=>{
      this.nombre_del_que_resolvio=data.respuestacuestionario.nombreParticipante;
    })
  }
  cantidad_res_corr(){
    for (let i = 0; i < this.cuestionario.listPreguntas!.length!; i++) {
      var listRespuestasss=this.cuestionario.listPreguntas?.at(i)?.listRespuestas;
      for (let j = 0; j < listRespuestasss?.length! ; j++) {
        var respuesta=listRespuestasss?.at(j);
        if(respuesta?.id==this.respuestas[i].respuestaId&&respuesta.esCorrecta==true){
          this.cant_res_co++;
          break;
        }
      }
    }
    console.log(this.cant_res_co);
  }

}
