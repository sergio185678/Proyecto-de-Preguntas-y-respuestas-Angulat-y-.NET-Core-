import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresarNombreComponent } from './ingresar-nombre/ingresar-nombre.component';
import { ListaDeCuestionariosComponent } from './lista-de-cuestionarios/lista-de-cuestionarios.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { RespuestaCuestionarioComponent } from './respuesta-cuestionario/respuesta-cuestionario.component';

const routes: Routes = [
  {path:'',component:ListaDeCuestionariosComponent},
  {path:'pregunta',component:PreguntaComponent},
  {path:'respuesta_del_cuestionario',component:RespuestaCuestionarioComponent},
  {path:'ingresarNombre',component:IngresarNombreComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCuestionariosRoutingModule { }
