import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  cambiarpassword:FormGroup;
  loading=false;
  constructor(private fb:FormBuilder, private userService:UsuarioService,private toastr:ToastrService,private router:Router){
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
    this.loading=true;
    const changePassword:any={
      passwordAnterior:this.cambiarpassword.value.passwordAnterior,
      nuevaPassword:this.cambiarpassword.value.nuevapassword
    };
    this.userService.changePassword(changePassword).subscribe(data=>{
      this.loading=false;
      //probando utilizando el mensaje return OK del backend
      this.toastr.info(data.message);

      this.router.navigate(['/dashboard'])
    },error=>{
      this.loading=false;
      this.cambiarpassword.reset();
      this.toastr.error(error.error.message,'Error!');
    })
  }
}
