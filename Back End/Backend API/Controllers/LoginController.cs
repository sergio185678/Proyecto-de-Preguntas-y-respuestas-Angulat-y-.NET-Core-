using Backend_API.Utils;
using Demo.Entities;
using Demo.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        public LoginController(ILoginService loginService)
        {
            this._loginService = loginService;
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody]Usuario usuario)
        {
            try
            {
                usuario.Password=Encriptar.EncriptarPasword(usuario.Password);
                var user = await _loginService.ValidateUser(usuario);
                if(user == null)
                {
                    return BadRequest(new { message="Usuario o contraseña invalidos" });
                }
                return Ok(new { usuario = user.NombreUsuario });
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}
