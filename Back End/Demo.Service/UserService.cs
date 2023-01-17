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
    public class UserService:IUserService
    {
        private readonly DemoDBContext _context;
        public UserService(DemoDBContext context)
        {
            this._context = context;
        }

        public async Task<Usuario> CreateUsuario(Usuario usuario)
        {
            await _context.Usuarios.AddAsync(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task DeleteUsuario(Usuario usuario)
        {
            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task<Usuario> GetUsuario(int id)
        {
            //en caso que no encuentre devuelve vacio
            return await _context.Usuarios.Where(u => u.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Usuario>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task UpdateUsuario(Usuario usuario)
        {
            _context.Entry(usuario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<Usuario> ValidarPassword(int id, string passwordAnterior)
        {
            var usuario=await _context.Usuarios.Where(u => u.Id == id && u.Password==passwordAnterior).FirstOrDefaultAsync();
            return usuario;
        }

        public async Task<bool> ValidateExistence(Usuario usuario)
        {
            //retorna tru o false
            return await _context.Usuarios.AnyAsync(x => x.NombreUsuario == usuario.NombreUsuario);
        }
        public async Task UpdatePassword(Usuario usuario)
        {
            _context.Update(usuario);
            await _context.SaveChangesAsync();
        }
    }
}
