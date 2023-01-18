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
        private readonly IConfiguration _configuration;
        public LoginController(ILoginService loginService, IConfiguration configuration)
        {
            this._loginService = loginService;
            this._configuration = configuration;
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
                //JWT
                string tokenString = JwtConfigurator.GetToken(user,this._configuration);
                return Ok(new { token = tokenString });
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}
