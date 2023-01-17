import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/user';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register!:FormGroup;
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService){
    this.register=this.fb.group({
      usuario:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(4)]],
      confirm_password:['']
    },{validator:this.checkPassword});
  }
  registrarUsuario(){
    const usuario:Usuario={
      nombreUsuario:this.register.value.usuario,
      password:this.register.value.password
    }
    this.usuarioService.saveUser(usuario).subscribe(data=>{
      console.log(data);
    })
  }
  checkPassword(group:FormGroup):any{
    const pass=group.controls['password'].value;
    const confirmpass=group.controls['confirm_password'].value;
    return pass===confirmpass?null:{notSame:true};
  }
}
