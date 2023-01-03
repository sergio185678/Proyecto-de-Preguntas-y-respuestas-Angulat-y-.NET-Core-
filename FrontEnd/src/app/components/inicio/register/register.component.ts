import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register!:FormGroup;
  constructor(private fb:FormBuilder){
    this.register=this.fb.group({
      usuario:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(4)]],
      confirm_password:['']
    },{validator:this.checkPassword});
  }
  registrarUsuario(){
    console.log(this.register);
  }
  checkPassword(group:FormGroup):any{
    const pass=group.controls['password'].value;
    const confirmpass=group.controls['confirm_password'].value;
    return pass===confirmpass?null:{notSame:true};
  }
}
