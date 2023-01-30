import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent {
  nombre!:string;

  constructor(private router:Router,private res_cues_services:RespuestaCuestionarioService){
    if(this.res_cues_services.idCuestionario==null){
      this.router.navigate(["/inicio"]);
    }
  }
  siguiente(){
    this.res_cues_services.nombreParticipante=(<HTMLInputElement>document.getElementById("nombre")).value;
    this.router.navigate(["/inicio/pregunta"])
    
  }
  actualizar(){
    this.nombre=(<HTMLInputElement>document.getElementById("nombre")).value;
    if(this.nombre==""){
      (<HTMLInputElement>document.getElementById("boton_sig")).disabled=true;
    }
    else{
      (<HTMLInputElement>document.getElementById("boton_sig")).disabled=false;
    }
  }
}
