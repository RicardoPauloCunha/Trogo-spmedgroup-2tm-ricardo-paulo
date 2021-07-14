using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.SpMedicalGroup.Domains
{
    public partial class Medicos
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public string Crm { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public int EspecialidadeId { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public int UsuarioId { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public int ClinicaId { get; set; }

        public Clinicas Clinica { get; set; }
        public Especialidades Especialidade { get; set; }
        public Usuarios Usuario { get; set; }
        public ICollection<Consultas> Consultas { get; set; }

        public Medicos()
        {
            Consultas = new HashSet<Consultas>();
        }
    }
}
