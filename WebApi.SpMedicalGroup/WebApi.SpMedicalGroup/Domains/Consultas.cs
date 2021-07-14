using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.SpMedicalGroup.Domains
{
    public partial class Consultas
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public int ProntuarioId { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public int MedicoId { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public DateTime DataAgendada { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public TimeSpan HoraAgendada { get; set; }

        public int SituacaoId { get; set; }
        public string Descricao { get; set; }

        public Medicos Medico { get; set; }
        public Prontuarios Prontuario { get; set; }
        public Situacoes Situacao { get; set; }
    }
}
