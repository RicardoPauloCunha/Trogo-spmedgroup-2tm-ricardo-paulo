using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Domains
{
    public partial class Especialidades
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public ICollection<Medicos> Medicos { get; set; }

        public Especialidades()
        {
            Medicos = new HashSet<Medicos>();
        }
    }
}
