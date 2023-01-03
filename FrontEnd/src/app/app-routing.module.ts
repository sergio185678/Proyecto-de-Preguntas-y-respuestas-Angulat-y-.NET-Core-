import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'/bienvenidos',pathMatch:'full'},//iniciando redirecciona al bienvenidos
  {path:'bienvenidos',component:BienvenidaComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  //esto siempre ponerlo en el ultimo
  {path:'**',redirectTo:'/bienvenidos',pathMatch:'full'}//en caso que no encuentre una direccion se dirige a ese link
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
