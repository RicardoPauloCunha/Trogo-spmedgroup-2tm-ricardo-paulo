using WebApi.SpMedicalGroup.Domains;
using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Interfaces
{
    public interface ITiposUsuariosRepositorio
    {
        List<TiposUsuarios> Listar();
    }
}
