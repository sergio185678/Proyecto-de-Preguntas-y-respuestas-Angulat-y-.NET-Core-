using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo.Entities
{
    public class Pregunta:EntityBase
    {
        [Required]
        [Column(TypeName = "varchar(150)")]
        public string Descripcion { get; set; }
        public int CuestionarioId { get; set; }
        public Cuestionario? Cuestionario { get; set; }
        //cuidado debe ser exactamente igual aunque comienze con minuscula
        public List<Respuesta> listRespuestas { get; set; }
    }
}
