using WebApi.SpMedicalGroup.Domains;
using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Interfaces
{
    interface IClinicasRepositorio
    {
        void Cadastrar(Clinicas clinica);
        void Alterar(Clinicas clinica);
        void Deletar(Clinicas clinica);
        Clinicas Buscar(int clinicaId);
        List<Clinicas> Listar();
        List<Clinicas> ListarIncludesMedico();
    }
}
