import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  login:FormGroup;
  constructor(private fb:FormBuilder){
    this.login=this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    });
  }
  log(){
    
    const usuario:Usuario={
      nombreUsuario:this.login.value.usuario,
      password:this.login.value.password
    };
    console.log(usuario);
  }
}
