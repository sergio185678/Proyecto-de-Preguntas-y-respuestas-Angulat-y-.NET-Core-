using Demo.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo.Service
{
    public interface IUserService
    {
        Task<Usuario> CreateUsuario(Usuario usuario);
        Task DeleteUsuario(Usuario usuario);
        Task<Usuario> GetUsuario(int id);
        Task<List<Usuario>> GetUsuarios();
        Task UpdateUsuario(Usuario usuario);
        Task<bool> ValidateExistence(Usuario usuario);
        Task<Usuario> ValidarPassword(int id, string passwordAnterior);
        Task UpdatePassword(Usuario usuario);
    }
}
