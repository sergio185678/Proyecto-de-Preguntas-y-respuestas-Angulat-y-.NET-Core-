import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent {
  idCuestionario!:number;
  list_preguntas:Pregunta[]=[];
  loading=false;
  rtaconfirm=false;//mira si se a seleccionado una respuesta
  opcionseleccionada:any;
  indice=0;
  idRespuestaSeleccionada:number=0;

  listRespuestaDetalle:RespuestaCuestionarioDetalle[]=[];

  constructor(private res_cues_service:RespuestaCuestionarioService,private cuestionarioservice:CuestionarioService,private router:Router){
    this.idCuestionario=this.res_cues_service.idCuestionario;
    if(this.idCuestionario==null){
      this.router.navigate(["/inicio"]);
      return;
    }
    this.res_cues_service.respuestas=[];//porsiacaso
    this.getCuestionario();
    
  }

  getCuestionario(){
    this.loading=true;
    this.cuestionarioservice.getCuestionario(this.idCuestionario).subscribe(data=>{
      this.list_preguntas=data.listPreguntas;
      this.loading=false;
      this.res_cues_service.cuestionario=data;
    })
  }
  obtenerPregunta(){
    return this.list_preguntas[this.indice].descripcion;
  }
  getindex(){
    return this.indice;
  }
  respuestaSelecionada(respuesta:any,id:number){
    this.opcionseleccionada=respuesta;
    this.rtaconfirm=true;
    this.idRespuestaSeleccionada=id;
  }
  agregaropcionclase(respuesta:any){
    if(respuesta==this.opcionseleccionada){
      return 'active text-light';
    }
    return '';
  }
  siguiente_preg(){
    this.res_cues_service.respuestas.push(this.idRespuestaSeleccionada);

    //creando Respuestadetalle
    const detalleRespuesta:RespuestaCuestionarioDetalle={
      respuestaId:this.idRespuestaSeleccionada
    }

    this.listRespuestaDetalle.push(detalleRespuesta);

    this.rtaconfirm=false;
    this.indice+=1;
    this.idRespuestaSeleccionada=0;
    //cuando completa todo lo redirige
    if(this.indice==this.list_preguntas.length){
      this.guardarRespuestaCuestionario();
    }
  }

  guardarRespuestaCuestionario(){
    const RtaCuestionario:RespuestaCuestionario={
      cuestionarioId:this.res_cues_service.idCuestionario,
      nombreParticipante:this.res_cues_service.nombreParticipante,
      listRtaCuestionarioDetalle:this.listRespuestaDetalle
    }
    this.loading=true;

    this.res_cues_service.guardarRespuestaCuestionario(RtaCuestionario).subscribe(data=>{
      this.loading=false;
      this.router.navigate(['/inicio/respuesta_del_cuestionario'])
    },err=>{
      this.loading=false;
    })
  }
}
