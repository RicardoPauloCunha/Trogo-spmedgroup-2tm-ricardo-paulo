using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Domains
{
    public partial class Clinicas
    {
        public int Id { get; set; }
        public string NomeFantasia { get; set; }
        public string RazaoSocial { get; set; }
        public string HorarioFuncionamento { get; set; }
        public string Cnpj { get; set; }
        public string Rua { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Cep { get; set; }

        public ICollection<Medicos> Medicos { get; set; }

        public Clinicas()
        {
            Medicos = new HashSet<Medicos>();
        }
    }
}
