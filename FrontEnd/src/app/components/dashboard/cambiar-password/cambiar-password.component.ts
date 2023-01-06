import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  cambiarpassword:FormGroup;
  constructor(private fb:FormBuilder){
    this.cambiarpassword=this.fb.group({
      passwordAnterior:['',Validators.required],
      nuevapassword:['',[Validators.required,Validators.minLength(4)]],
      confirmpassword:['']
    },{validator:this.checkPassword});
  }
  checkPassword(group:FormGroup):any{
    const pass=group.controls['nuevapassword'].value;
    const confirmpass=group.controls['confirmpassword'].value;
    return pass===confirmpass?null:{notSame:true};
  }
  guardarpassword(){
    console.log(this.cambiarpassword);
  }
}
