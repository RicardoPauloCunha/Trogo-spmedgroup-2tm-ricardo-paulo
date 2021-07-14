using WebApi.SpMedicalGroup.Domains;
using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Interfaces
{
    interface IMedicosRepositorio
    {
        void Cadastrar(Medicos medico);
        void Alterar(Medicos medico);
        void Deletar(Medicos medico);
        Medicos Buscar(int medicoId);
        List<Medicos> Listar();
        List<Medicos> ListarByQuery();
    }
}
