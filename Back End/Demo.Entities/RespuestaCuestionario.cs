using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo.Entities
{
    public class RespuestaCuestionario:EntityBase
    {
        [Required]
        [Column(TypeName ="varchar(100)")]
        public string NombreParticipante { get; set; }
        public DateTime Fecha { get; set; }
        public int Activo { get; set; }
        public int CuestionarioId { get; set; }
        public Cuestionario? Cuestionario { get; set; }
        public List<RespuestaCuestionarioDetalle> ListRtaCuestionarioDetalle { get; set; }
    }
}
