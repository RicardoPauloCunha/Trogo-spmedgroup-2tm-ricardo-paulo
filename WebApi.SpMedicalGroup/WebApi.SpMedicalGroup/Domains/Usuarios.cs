using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.SpMedicalGroup.Domains
{
    public partial class Usuarios
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        [DataType(DataType.Password)]
        [StringLength(30, MinimumLength = 4, ErrorMessage = "Senha deve possuir pelo menos 4 caracteres.")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public int TipoUsuarioId { get; set; }

        public TiposUsuarios TipoUsuario { get; set; }
        public ICollection<Medicos> Medicos { get; set; }
        public ICollection<Prontuarios> Prontuarios { get; set; }

        public Usuarios()
        {
            Medicos = new HashSet<Medicos>();
            Prontuarios = new HashSet<Prontuarios>();
        }
    }
}
