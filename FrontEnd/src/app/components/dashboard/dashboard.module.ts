import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

//components
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { NuevoCuestionarioComponent } from './cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { Paso1Component } from './cuestionarios/nuevo-cuestionario/paso1/paso1.component';
import { Paso2Component } from './cuestionarios/nuevo-cuestionario/paso2/paso2.component';
import { NuevaPreguntaComponent } from './cuestionarios/nuevo-cuestionario/paso2/nueva-pregunta/nueva-pregunta.component';
import { CuestionarioComponent } from './cuestionarios/cuestionario/cuestionario.component';
import { EstadisticasComponent } from './cuestionarios/estadisticas/estadisticas.component';
import { DetalleRespuestaComponent } from './cuestionarios/estadisticas/detalle-respuesta/detalle-respuesta.component';

@NgModule({
  declarations: [
    CambiarPasswordComponent,
    CuestionariosComponent,
    NuevoCuestionarioComponent,
    Paso1Component,
    Paso2Component,
    NuevaPreguntaComponent,
    CuestionarioComponent,
    EstadisticasComponent,
    DetalleRespuestaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
