import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';
import { CuestionarioComponent } from './components/dashboard/cuestionarios/cuestionario/cuestionario.component';
import { CuestionariosComponent } from './components/dashboard/cuestionarios/cuestionarios.component';
import { DetalleRespuestaComponent } from './components/dashboard/cuestionarios/estadisticas/detalle-respuesta/detalle-respuesta.component';
import { EstadisticasComponent } from './components/dashboard/cuestionarios/estadisticas/estadisticas.component';
import { NuevoCuestionarioComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { Paso1Component } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso1/paso1.component';
import { Paso2Component } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso2/paso2.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { IngresarNombreComponent } from './components/inicio/list-cuestionarios/ingresar-nombre/ingresar-nombre.component';
import { ListCuestionariosComponent } from './components/inicio/list-cuestionarios/list-cuestionarios.component';
import { PreguntaComponent } from './components/inicio/list-cuestionarios/pregunta/pregunta.component';
import { RespuestaCuestionarioComponent } from './components/inicio/list-cuestionarios/respuesta-cuestionario/respuesta-cuestionario.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';

//Guards
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/inicio',pathMatch:'full'},//iniciando redirecciona al bienvenidos
  {path:'inicio',component:InicioComponent, children:[
    {path:'',component:BienvenidaComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    //aca hago para que cuando abra ese url mediante el Lazy loading recien importe el modulo de ListCuestioanrio
    {path:'ListCuestionarios',component:ListCuestionariosComponent,
        loadChildren:()=>import('./components/inicio/list-cuestionarios/list-cuestionarios.module')
        .then(x=>x.ListCuestionariosModule)}
  ]},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard] , 
        loadChildren:()=>import('./components/dashboard/dashboard.module')
        .then(x=>x.DashboardModule)},
  
  //esto siempre ponerlo en el ultimo
  {path:'**',redirectTo:'/inicio',pathMatch:'full'}//en caso que no encuentre una direccion se dirige a ese link
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
