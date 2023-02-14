import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { CuestionarioComponent } from './cuestionarios/cuestionario/cuestionario.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { DetalleRespuestaComponent } from './cuestionarios/estadisticas/detalle-respuesta/detalle-respuesta.component';
import { EstadisticasComponent } from './cuestionarios/estadisticas/estadisticas.component';
import { NuevoCuestionarioComponent } from './cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { Paso1Component } from './cuestionarios/nuevo-cuestionario/paso1/paso1.component';
import { Paso2Component } from './cuestionarios/nuevo-cuestionario/paso2/paso2.component';

const routes: Routes = [
  {path:'',component:CuestionariosComponent},
  {path:'cambiarPassword',component:CambiarPasswordComponent},
  {path:'verCuestionario/:id',component:CuestionarioComponent},//importante para los que requieran algo en la url
  {path:'estadisticas/:id',component:EstadisticasComponent},
  {path:'detalleRespuesta/:id',component:DetalleRespuestaComponent},
  {path:'nuevoCuestionario',component:NuevoCuestionarioComponent,children:[
    {path:'paso1',component:Paso1Component},
    {path:'paso2',component:Paso2Component}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
