using WebApi.SpMedicalGroup.ViewModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.SpMedicalGroup.Domains
{
    public partial class Prontuarios
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        [StringLength(14, MinimumLength = 11, ErrorMessage = "RG deve possuir no máximo 14 caracteres e no minimo 11 caracteres.")]
        public string Rg { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        [StringLength(14, MinimumLength = 11, ErrorMessage = "CPF deve possuir no máximo 14 caracteres e no minimo 11 caracteres.")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        [CurrentDate(ErrorMessage = "Data de nascimento deve ser meno que a data atual.")]
        public DateTime DataNascimento { get; set; }

        [StringLength(20, MinimumLength = 9,ErrorMessage = "Telefone deve possuir no máximo 20 caracteres e no minimo 9.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public string Rua { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public string Bairro { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        [StringLength(2, ErrorMessage = "Coloque apenas a Sigla do estado, no maximo 2 caracteres.")]
        public string Estado { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        [StringLength(9, ErrorMessage = "CEP deve possuir no máximo 9 caracteres.")]
        public string Cep { get; set; }

        [Required(ErrorMessage = "O campo precisa ser informado.")]
        public int UsuarioId { get; set; }

        public Usuarios Usuario { get; set; }
        public ICollection<Consultas> Consultas { get; set; }

        public Prontuarios()
        {
            Consultas = new HashSet<Consultas>();
        }
    }
}
