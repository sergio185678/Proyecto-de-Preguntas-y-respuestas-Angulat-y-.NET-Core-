import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css']
})
export class Paso1Component {
  datosCuestionario:FormGroup;
  constructor(private fb:FormBuilder,private router:Router,private cuestionarioService:CuestionarioService) {
    this.datosCuestionario=this.fb.group({
      titulo:['',Validators.required],
      descripcion:['',Validators.required]
    })
  }
  pasoUno():void{
    this.cuestionarioService.tituloCuestionario=this.datosCuestionario.value.titulo;
    this.cuestionarioService.descripcionCuestionario=this.datosCuestionario.value.descripcion;
    this.router.navigate(['/dashboard/nuevoCuestionario/paso2']);
  }
}
