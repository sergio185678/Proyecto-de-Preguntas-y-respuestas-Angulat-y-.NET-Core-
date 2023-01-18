import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loading=false;
  login:FormGroup;
  constructor(private fb:FormBuilder,private toastr:ToastrService,private router:Router, private loginService:LoginService){
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
    this.loading=true;
    this.loginService.login(usuario).subscribe(data=>{
      this.loading=false;
      this.loginService.setSession(data.usuario)
      this.router.navigate(['/dashboard']);
    },error=>{
      this.loading=false;
      this.toastr.error(error.error.message,'Error');
      this.login.reset();
    })
    // setTimeout(()=>{
    //   if(usuario.nombreUsuario==="pepe"&&usuario.password==="12345"){
    //     this.login.reset();
    //     this.router.navigate(['/dashboard']);
    //   }
    //   else{
    //     this.toastr.error('Usuario o contraseña incorrecta','Error');
    //     this.login.reset();
    //   }
    //   this.loading=false;
    // },3000)
    
  }
}
