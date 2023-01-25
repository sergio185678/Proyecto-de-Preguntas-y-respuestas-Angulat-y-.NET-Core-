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
    public class CuestionarioService : ICuestionarioService
    {
        private readonly DemoDBContext _context;
        public CuestionarioService(DemoDBContext context)
        {
            _context = context;
        }

        public async Task<Cuestionario> BuscarCuestionario(int cuestionarioId,int userId)
        {
            var cuestionario = await _context.Cuestionarios.Where(x => x.Id == cuestionarioId && x.Activo == 1&&x.UsuarioId==userId).FirstOrDefaultAsync();
            return cuestionario;
        }

        public async Task CreateCuestionario(Cuestionario cuestionario)
        {
            await _context.Cuestionarios.AddAsync(cuestionario);
            await _context.SaveChangesAsync();
        }

        public async Task EliminarCuestionario(Cuestionario cuestionario)
        {
            //no lo elimina de forma fisica sino logica
            cuestionario.Activo = 0;
            _context.Entry(cuestionario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        //devolvera todo el cuestionario con sus preguntas y respuestas
        public async Task<Cuestionario> GetCuestionarioById(int cuestionarioId)
        {
            var cuestionario = await _context.Cuestionarios.Where(x => x.Id == cuestionarioId && x.Activo == 1)
                //estos requieres otro paquete nugget
                .Include(x=>x.listPreguntas)//incluye sus preguntas porque esta dentro en el primer nivel
                .ThenInclude(x=>x.listRespuestas)//esto le pertenece al de preguntas y no al cuestionario por eso usar esto
                .FirstOrDefaultAsync();
            return cuestionario;
        }

        public async Task<List<Cuestionario>> GetListCuestionario()
        {
            var listCuestionario = await _context.Cuestionarios.Where(x => x.Activo == 1)
                .Select(o=>new Cuestionario 
                {
                    Id=o.Id,
                    Nombre=o.Nombre,
                    Descripcion=o.Descripcion,
                    FechaCreacion=o.FechaCreacion, 
                    Usuario=new Usuario { NombreUsuario=o.Usuario.NombreUsuario } 
                })
                .ToListAsync();
            return listCuestionario;
        }

        public  async Task<List<Cuestionario>> ListCuestionariosByUser(int userId)
        {
            var listcuestionario=await _context.Cuestionarios.Where(x => x.Activo == 1 && x.UsuarioId == userId).ToListAsync();
            return listcuestionario;
        }
    }
}
