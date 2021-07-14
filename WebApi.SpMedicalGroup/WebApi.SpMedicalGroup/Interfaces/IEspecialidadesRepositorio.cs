using WebApi.SpMedicalGroup.Domains;
using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Interfaces
{
    public interface IEspecialidadesRepositorio
    {
        List<Especialidades> Listar();
    }
}
