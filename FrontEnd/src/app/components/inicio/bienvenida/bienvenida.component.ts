import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {
  constructor(private router:Router,private login_service:LoginService){
    if(this.login_service.getToken()!=null){
      this.router.navigate(['/dashboard']);
    }
  }
}
