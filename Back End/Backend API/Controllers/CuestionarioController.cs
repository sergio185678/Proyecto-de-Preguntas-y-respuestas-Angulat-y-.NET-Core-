using Backend_API.Utils;
using Demo.Entities;
using Demo.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuestionarioController : ControllerBase
    {
        // GET: api/<CuestionarioController>
        private readonly ICuestionarioService _cuestionarioService;
        public CuestionarioController(ICuestionarioService cuestionarioService)
        {
            this._cuestionarioService = cuestionarioService;
        }
        
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]//solo poniendo autentifiacion con Jwt
        public async Task<ActionResult> Post([FromBody]Cuestionario cuestionario)
        {
            try
            {
                //obteniendo idUsuario
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int id = JwtConfigurator.GetTokenIdUsuario(identity);
                //
                cuestionario.UsuarioId = id;
                cuestionario.Activo = 1;
                cuestionario.FechaCreacion=DateTime.Now;
                await _cuestionarioService.CreateCuestionario(cuestionario);

                return Ok(new {message="Se agrego el cuestionario exitosamente"});
            }
            catch (Exception err)
            {

                return BadRequest(err.Message);
            }
        }

        //aca retorno solo cuestionarios del usuario
        [Route("GetListCuestionariosByUser")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<List<Cuestionario>>> GetListCuestionariosbyuser()
        {
            try
            {
                //obteniendo idUsuario
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int id = JwtConfigurator.GetTokenIdUsuario(identity);

                var listCuestionarios = await _cuestionarioService.ListCuestionariosByUser(id);
                if (listCuestionarios == null)
                {
                    return NotFound();
                }
                return Ok(listCuestionarios);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        
        [HttpGet("{idCuestionario}")]
        public async Task<ActionResult> Get(int idCuestionario)
        {
            try
            {
                var cuestionario= await _cuestionarioService.GetCuestionarioById(idCuestionario);
                if (cuestionario == null)
                {
                    return NotFound();
                }
                return Ok(cuestionario);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpDelete("{idCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Delete(int idCuestionario)
        {
            try
            {
                //obteniendo idUsuario
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int id = JwtConfigurator.GetTokenIdUsuario(identity);

                var cuestionario = await _cuestionarioService.BuscarCuestionario(idCuestionario, id);
                if (cuestionario == null)
                {
                    return NotFound();
                }
                await _cuestionarioService.EliminarCuestionario(cuestionario);
                return Ok(new {message="El cuestionario fue eliminado con exito"});
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        //aca estoy retornando todos los cuestionarios
        [Route("GetListCuestionario")]
        [HttpGet]
        public async Task<ActionResult> GetListCuestionarios()
        {
            try
            {
                var listCuestionario = await _cuestionarioService.GetListCuestionario();
                return Ok(listCuestionario);
            }
            catch (Exception err)
            {

                return BadRequest(err.Message);
            }
        }
    }
}
