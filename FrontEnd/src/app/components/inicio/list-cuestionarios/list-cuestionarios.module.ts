import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { ListCuestionariosRoutingModule } from './list-cuestionarios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

//componentes
import { IngresarNombreComponent } from './ingresar-nombre/ingresar-nombre.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { RespuestaCuestionarioComponent } from './respuesta-cuestionario/respuesta-cuestionario.component';
import { ListaDeCuestionariosComponent } from './lista-de-cuestionarios/lista-de-cuestionarios.component';

@NgModule({
  declarations: [
    IngresarNombreComponent,
    PreguntaComponent,
    RespuestaCuestionarioComponent,
    ListaDeCuestionariosComponent
  ],
  imports: [
    CommonModule,
    ListCuestionariosRoutingModule,
    SharedModule
  ]
})
export class ListCuestionariosModule { }
