using Demo.DataAccess;
using Demo.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo.Service
{
    public class RespuestaCuestionarioService:IRespuestaCuestionarioService
    {
        private readonly DemoDBContext _context;
        public RespuestaCuestionarioService(DemoDBContext context)
        {
            this._context = context;
        }

        public async Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int id, int idUsuario)
        {
            var cuestionarioRespuesta = await _context.RespuestaCuestionarios.Where(x => x.Id == id && x.Cuestionario.UsuarioId == idUsuario && x.Activo == 1).FirstOrDefaultAsync();
            return cuestionarioRespuesta;
        }

        public async Task EliminarCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            respuestaCuestionario.Activo = 0;
            _context.Entry(respuestaCuestionario).State=EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetIdCuestionarioByIdRespuestaCuestionario(int idRespuestaCuestionario)
        {
            var Rescuestionario = await _context.RespuestaCuestionarios.Where(x => x.Id == idRespuestaCuestionario && x.Activo == 1).FirstOrDefaultAsync();
            return Rescuestionario.CuestionarioId;
        }

        public async Task<List<RespuestaCuestionario>> GetListRespuestaCuestionario(int idcuestionario, int idUsuario)
        {
            var listCuestionarioRespuestas = await _context.RespuestaCuestionarios.Where(x => x.CuestionarioId == idcuestionario && x.Activo == 1 && x.Cuestionario.UsuarioId == idUsuario)
                                            .OrderByDescending(x => x.Fecha).ToListAsync();//va devolver por orden de fecha
            return listCuestionarioRespuestas;
        }

        public async Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario)
        {
            var listRespuestas = await _context.RespuestaCuestionarioDetalles.Where(x => x.RespuestaCuestionarioId == idRespuestaCuestionario)
                .Select(x => new RespuestaCuestionarioDetalle{//solo devuelvo la respuestaid
                    RespuestaId = x.RespuestaId
                })
                .ToListAsync();

            return listRespuestas;
        }

        public async Task SaveRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            respuestaCuestionario.Activo = 1;
            respuestaCuestionario.Fecha=DateTime.Now;
            _context.RespuestaCuestionarios.Add(respuestaCuestionario);
            await _context.SaveChangesAsync();
        }
    }
}
