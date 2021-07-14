using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Domains
{
    public partial class TiposUsuarios
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public ICollection<Usuarios> Usuarios { get; set; }

        public TiposUsuarios()
        {
            Usuarios = new HashSet<Usuarios>();
        }
    }
}
