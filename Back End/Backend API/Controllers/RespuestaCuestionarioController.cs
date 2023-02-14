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
    public class RespuestaCuestionarioController : ControllerBase
    {
        private readonly IRespuestaCuestionarioService _respuestaCuestionarioService;
        private readonly ICuestionarioService _cuestionarioService;
        public RespuestaCuestionarioController(IRespuestaCuestionarioService respuestaCuestionarioService, ICuestionarioService cuestionarioService)
        {
            _respuestaCuestionarioService = respuestaCuestionarioService;
            _cuestionarioService = cuestionarioService;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RespuestaCuestionario respuestaCuestionario)
        {
            try
            {
                if(respuestaCuestionario != null)
                {
                    await _respuestaCuestionarioService.SaveRespuestaCuestionario(respuestaCuestionario);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
                
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        [HttpGet("{idCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Get(int idCuestionario)
        {
            try
            {
                //obteniendo idUsuario
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int id = JwtConfigurator.GetTokenIdUsuario(identity);

                var listRespuestasCuestionario = await _respuestaCuestionarioService.GetListRespuestaCuestionario(idCuestionario, id);
                if(listRespuestasCuestionario != null)
                {
                    return Ok(listRespuestasCuestionario);
                }
                else
                {
                    return BadRequest(new { message = "Error al buscar el listado de respuestas" });
                }
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        [HttpDelete("{RtaCuesid}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Delete(int RtaCuesid)
        {
            try
            {
                //obteniendo idUsuario
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int id_usuario = JwtConfigurator.GetTokenIdUsuario(identity);

                var respuestaCuestionario = await _respuestaCuestionarioService.BuscarRespuestaCuestionario(RtaCuesid, id_usuario);
                if (respuestaCuestionario == null)
                {
                    return BadRequest(new { message = "Error al buscar la respuesta del cuestionario" });
                }
                await _respuestaCuestionarioService.EliminarCuestionario(respuestaCuestionario);
                return Ok(new { message = "Se elimino correctamente" });
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        [HttpGet("GetCuestionarioByIdRespuesta/{idRespuestaCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> GetCuestionarioByIdRespuesta(int idRespuestaCuestionario)
        {
            try
            {
                //obteniendo idUsuario
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int id_usuario = JwtConfigurator.GetTokenIdUsuario(identity);

                //obtener primero idCuestionario
                int id_cuestionario = await _respuestaCuestionarioService.GetIdCuestionarioByIdRespuestaCuestionario(idRespuestaCuestionario);

                //busca el cuestionario
                var cuestionario = await _cuestionarioService.GetCuestionarioById(id_cuestionario);

                //obtengo las respuestas del usuario que lo resolvio
                var listRespuestas = await _respuestaCuestionarioService.GetListRespuestas(idRespuestaCuestionario);

                //retorn o el cuestionario y las respuestas
                return Ok(new {cuestionario=cuestionario,respuesta=listRespuestas});
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        [HttpGet("GetRespuestaCuestioanrio/{idRespuestaCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> GetRespuestaCuestioanriobythisid(int idRespuestaCuestionario)
        {
            try
            {
                //obteniendo idUsuario
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int id_usuario = JwtConfigurator.GetTokenIdUsuario(identity);

                var respuestaCuestionario = await _respuestaCuestionarioService.BuscarRespuestaCuestionario(idRespuestaCuestionario, id_usuario);
                if (respuestaCuestionario == null)
                {
                    return BadRequest(new { message = "Error al buscar la respuesta del cuestionario" });
                }
                return Ok(new { respuestacuestionario = respuestaCuestionario});
            }
            catch (Exception err)
            {

                return BadRequest(err.Message);
            }
        }
    }
}
