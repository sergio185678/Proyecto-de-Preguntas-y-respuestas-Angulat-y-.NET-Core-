using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo.Entities
{
    public class RespuestaCuestionarioDetalle : EntityBase
    {
        public int RespuestaCuestionarioId { get; set; }
        public RespuestaCuestionario? RespuestaCuestionario { get; set; }
        public int RespuestaId { get; set; }
        public Respuesta? Respuesta { get; set; }
    }
}
