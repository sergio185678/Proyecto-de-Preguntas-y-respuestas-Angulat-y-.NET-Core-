import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
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
  
  constructor(private cuestionarioService:CuestionarioService,private toastr:ToastrService,private roter:Router){

  }
  ngOnInit(): void {
    //estoy llamando lo guardado en service
    this.tituloCuestionario=this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario=this.cuestionarioService.descripcionCuestionario;
  }
}
