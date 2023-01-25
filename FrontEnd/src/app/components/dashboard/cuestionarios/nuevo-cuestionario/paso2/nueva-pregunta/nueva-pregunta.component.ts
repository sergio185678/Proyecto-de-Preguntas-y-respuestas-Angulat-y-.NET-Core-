import { Component,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent {
  nuevaPregunta:FormGroup;
  pregunta?:Pregunta;
  rtaCorrecta=0;
  @Output() enviarPregunta=new EventEmitter<Pregunta>;

  constructor(private fb:FormBuilder,private toastr:ToastrService){
    this.nuevaPregunta=this.fb.group({
      titulo:['',Validators.required],
      respuestas:this.fb.array([])//si quiero utilizar asi utilizar el FormArray
    })
    this.agregarRespuestaPorDefecto();
  }
  //Devuelve fomrarray de respuestas
  get getRespuestas():FormArray{
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }
  //agregar respuesta al array
  agregarRespuesta():void{
    this.getRespuestas.push(this.fb.group({
      descripcion:['',Validators.required],
      esCorrecta:0
    }))
  }

  agregarRespuestaPorDefecto():void{
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  eliminarRespuesta(index:number):void{
    //veo que tenga como minimo 2 respuestas
    if(this.getRespuestas.length==2){
      this.toastr.error('Como minimo la pregunta debe tener 2 respuestas','Error')
    }
    else{
      //elimina una posicion exacta
      this.getRespuestas.removeAt(index);
    }
  }

  setRespuestaValida(index:number):void{
    this.rtaCorrecta=index;
  }

  agregarPregunta():void{
    const tituloPregunta=this.nuevaPregunta.get('titulo')?.value;
    const arrayRespuestas=this.nuevaPregunta.get('respuestas')?.value;
    const arrayRta:Respuesta[]=[];
    
    //recorro todo eso para guardarlo bien con push el arrayrta
    arrayRespuestas.forEach((element: any,index:number) => {
      const respuesta:Respuesta=new Respuesta(element.descripcion,false);
      if(index==this.rtaCorrecta){
        respuesta.esCorrecta=true;
      }
      arrayRta.push(respuesta);
    });
    
    const pregunta:Pregunta=new Pregunta(tituloPregunta,arrayRta);
    console.log(pregunta);
    this.enviarPregunta.emit(pregunta);
    this.resetPregunta();
  }

  resetPregunta():void{
    this.rtaCorrecta=0;
    this.nuevaPregunta.reset();
    this.getRespuestas.clear();
    this.agregarRespuestaPorDefecto();
  }

}
