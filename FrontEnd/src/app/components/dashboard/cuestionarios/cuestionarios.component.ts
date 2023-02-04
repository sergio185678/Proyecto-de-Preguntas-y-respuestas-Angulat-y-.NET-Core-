import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit{
  nombreUsuario?:string|null;
  lisCuestionarios:Cuestionario[]=[];
  loading=false;
  constructor(private loginService:LoginService,private cuestionarioservice:CuestionarioService,private toastr:ToastrService){}
  ngOnInit(){
    this.getNombreUsuario();
    this.getCuestionarios();
  }
  getNombreUsuario(){
    this.nombreUsuario= this.loginService.getTokenDecoded().sub;
  }
  getCuestionarios(){
    this.loading=true;
    this.cuestionarioservice.getListCuesitonariobyUser().subscribe(data=>{
      this.lisCuestionarios=data;
      this.loading=false;
    },error=>{
      this.loading=false;
      console.log(error);
    })
  }
  eliminarCuestionario(idCuestionario:number|undefined){
    if(confirm("Estas seguro que deseas eliminar el cuestionario?")){
      this.loading=true;
      this.cuestionarioservice.deleteCuestionario(idCuestionario).subscribe(data=>{
        this.loading=false;
        this.toastr.success('El cuestionario fue eliminado con exito!','Registro eliminado');
        this.getCuestionarios();
      },error=>{
        this.loading=false;
      })
    }
  }
}
