using Demo.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo.Service
{
    public interface ICuestionarioService
    {
        Task CreateCuestionario(Cuestionario cuestionario);
        Task<List<Cuestionario>> ListCuestionariosByUser(int userId);
        Task<Cuestionario> GetCuestionarioById(int cuestionarioId);
        Task<Cuestionario> BuscarCuestionario(int cuestionarioId, int userId);
        Task EliminarCuestionario(Cuestionario cuestionario);

        Task<List<Cuestionario>> GetListCuestionario();
    }
}
