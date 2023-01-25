using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo.Entities
{
    public class Respuesta:EntityBase
    {
        [Required]
        [Column(TypeName = "varchar(150)")]
        public string Descripcion { get; set; }
        [Required]
        public bool EsCorrecta { get; set; }
        public int PreguntaId { get; set; }
        public Pregunta? Pregunta { get; set; }
    }
}
