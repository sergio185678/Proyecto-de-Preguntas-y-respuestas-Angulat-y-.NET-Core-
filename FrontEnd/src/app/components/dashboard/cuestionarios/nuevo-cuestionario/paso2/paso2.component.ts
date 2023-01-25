import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Pregunta } from 'src/app/models/pregunta';
import { Usuario } from 'src/app/models/user';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.css']
})
export class Paso2Component implements OnInit{
  tituloCuestionario?:string;
  descripcionCuestionario?:string;
  listPreguntas?:Pregunta[]=[];
  loading=false;
  
  constructor(private cuestionarioService:CuestionarioService,private toastr:ToastrService,private roter:Router){

  }
  ngOnInit(): void {
    //estoy llamando lo guardado en service
    this.tituloCuestionario=this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario=this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta(pregunta:Pregunta){
    this.listPreguntas?.push(pregunta);
  }

  eliminarPregunta(index:number){
    this.listPreguntas?.splice(index,1);
  }

  finalizarCuestionario(){
    this.loading=true;
    //juntar y crear
    const cuestionario:Cuestionario={
      nombre:this.tituloCuestionario,
      descripcion:this.descripcionCuestionario,
      listPreguntas:this.listPreguntas
    };
    console.log(cuestionario);
    //enviar al service
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(data=>{
      this.loading=false;
      this.toastr.success("El cuestionario fue registrado con exito","Cuestionario Registrado");
      this.roter.navigate(['/dashboard']);
    },error=>{
      this.loading=false;
      this.toastr.error("Ocurrio un errror","Error!");
      this.roter.navigate(['/dashboard']);
    });
  }
}
