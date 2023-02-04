import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
  idCuestionario!:number;
  loading=false;
  lisRes_Cuestionario:any[]=[];

  constructor(private aRoute:ActivatedRoute,private res_cues_service:RespuestaCuestionarioService,private toastr:ToastrService){
    this.idCuestionario=+this.aRoute.snapshot.paramMap.get("id")!;
    this.getlist_res_cues_ser();
  }

  getlist_res_cues_ser(){
    this.loading=true;
    this.res_cues_service.getRespuestaCuestionario(this.idCuestionario).subscribe(data=>{
      this.loading=false;
      this.lisRes_Cuestionario=data;
    })
  }
  eliminarRespuestaCuestioanrio(idRtaCues:number){
    this.loading=true;
    this.res_cues_service.eliminarRespuestaCuestionario(idRtaCues).subscribe(data=>{
      this.loading=false;
      this.toastr.success('La respuesta del Cuestionario se elimino con exito','Registro eliminado');
      //para actualizar
      this.getlist_res_cues_ser();
    },error=>{
      this.loading=false;
    })
  }
}
