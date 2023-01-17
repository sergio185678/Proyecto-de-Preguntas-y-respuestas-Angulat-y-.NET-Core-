using Backend_API.Utils;
using Demo.Dto;
using Demo.Entities;
using Demo.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;

namespace Backend_API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class UserController:ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> Get()
        {
            return await _userService.GetUsuarios();
        }
        [HttpGet("{id}",Name ="GetUsuario")]
        public async Task<ActionResult<Usuario>> Get(int id)
        {
            var usuario = await _userService.GetUsuario(id);
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post([FromBody] Usuario usuario)
        {
            try
            {
                var validate = await _userService.ValidateExistence(usuario);
                if (validate)
                {
                    return BadRequest(new { message = "El usuario " + usuario.NombreUsuario + " ya existe!" });
                }
                usuario.Password=Encriptar.EncriptarPasword(usuario.Password);
                await _userService.CreateUsuario(usuario);
                //quiero que en esta ruta me regresa la info
                return CreatedAtRoute("GetUsuario", new { id = usuario.Id }, usuario);
            }
            catch(Exception err)
            {
                return BadRequest(err.Message);
            }
        
        }
        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            var usuario= await _userService.GetUsuario(id);
            if(usuario == null)
            {
                return NotFound();
            }
            await _userService.DeleteUsuario(usuario);
            return NoContent();
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id,Usuario usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest();
            }
            await _userService.UpdateUsuario(usuario);
            return NoContent();
        }
        //localhost:____/api/User/CambiarPassword
        [Route("CambiarPassword")]
        [HttpPut]
        public async Task<ActionResult> CambiarPassword([FromBody] CambiarPasswordDTO cambiarPassword)
        {
            try
            {
                //probando temporalmente un con id fijo
                int id = 4;
                string passwordEncriptado = Encriptar.EncriptarPasword(cambiarPassword.passwordAnterior);
                //valida ya con la password encriptada
                var usuario=await _userService.ValidarPassword(id, passwordEncriptado);
                if (usuario == null)
                {
                    return BadRequest(new { message = "Password incorrecto" });
                }
                else
                {
                    usuario.Password = Encriptar.EncriptarPasword(cambiarPassword.nuevaPassword);
                    await _userService.UpdatePassword(usuario);
                    return Ok(new { message = "La contraseña se actualizo" });
                }
                
            }
            catch (Exception err)
            {

                return BadRequest(err.Message);
            }
        }
    }
}
