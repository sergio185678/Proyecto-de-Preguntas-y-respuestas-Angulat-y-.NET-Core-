using Demo.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo.Service
{
    public interface IRespuestaCuestionarioService
    {
        Task SaveRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario);
        Task<List<RespuestaCuestionario>> GetListRespuestaCuestionario(int idcuestionario, int idUsuario);
        Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int id, int idUsuario);
        Task EliminarCuestionario(RespuestaCuestionario respuestaCuestionario);
        Task<int> GetIdCuestionarioByIdRespuestaCuestionario(int idRespuestaCuestionario);
        Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario);
    }
}
