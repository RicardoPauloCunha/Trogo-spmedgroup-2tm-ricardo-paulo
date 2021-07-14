using WebApi.SpMedicalGroup.Domains;
using WebApi.SpMedicalGroup.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace WebApi.SpMedicalGroup.Repositorios
{
    public class TiposUsuariosRepositorio : ITiposUsuariosRepositorio
    {
        public List<TiposUsuarios> Listar()
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.TiposUsuarios.ToList();
            }
        }
    }
}
