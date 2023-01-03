import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre='Juan';
  img1="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg";
  txtboton="Click al boton para modificarme";
  texto_guardar="";
  listEstudiantes:any[]=[
    { nombre:"Tomas gonzales",estado:"promocionado" },
    { nombre:"Pepeasf",estado:"regular" }
  ]

  constructor(){
    setInterval(()=>this.nombre='PEPE',3000);
  }
  getsuma(num1:number,num2:number){
    return num1+num2;
  }
  cambiartxt(){
    this.txtboton="me modifique";
  }
}
