using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Domains
{
    public partial class Situacoes
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public ICollection<Consultas> Consultas { get; set; }

        public Situacoes()
        {
            Consultas = new HashSet<Consultas>();
        }
    }
}
