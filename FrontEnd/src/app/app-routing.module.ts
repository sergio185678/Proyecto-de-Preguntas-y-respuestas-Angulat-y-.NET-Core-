import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';
import { CuestionariosComponent } from './components/dashboard/cuestionarios/cuestionarios.component';
import { NuevoCuestionarioComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { Paso1Component } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso1/paso1.component';
import { Paso2Component } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso2/paso2.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio',pathMatch:'full'},//iniciando redirecciona al bienvenidos
  {path:'inicio',component:InicioComponent, children:[
    {path:'',component:BienvenidaComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
  ]},
  {path:'dashboard',component:DashboardComponent, children:[
    {path:'',component:CuestionariosComponent},
    {path:'cambiarPassword',component:CambiarPasswordComponent},
    {path:'nuevoCuestionario',component:NuevoCuestionarioComponent,children:[
      {path:'paso1',component:Paso1Component},
      {path:'paso2',component:Paso2Component}
    ]}
  ]},
  
  //esto siempre ponerlo en el ultimo
  {path:'**',redirectTo:'/inicio',pathMatch:'full'}//en caso que no encuentre una direccion se dirige a ese link
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
