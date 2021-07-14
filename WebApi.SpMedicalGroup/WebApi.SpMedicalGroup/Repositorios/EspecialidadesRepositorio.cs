using WebApi.SpMedicalGroup.Domains;
using WebApi.SpMedicalGroup.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace WebApi.SpMedicalGroup.Repositorios
{
    public class EspecialidadesRepositorio : IEspecialidadesRepositorio
    {
        public List<Especialidades> Listar()
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return (ctx.Especialidades.ToList());
            }
        }
    }
}
