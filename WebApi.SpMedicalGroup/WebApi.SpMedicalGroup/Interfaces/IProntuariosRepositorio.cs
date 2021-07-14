using WebApi.SpMedicalGroup.Domains;
using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Interfaces
{
    interface IProntuariosRepositorio
    {
        void Cadastrar(Prontuarios prontuario);
        void Alterar(Prontuarios prontuario);
        void Deletar(Prontuarios prontuario);
        Prontuarios Buscar(int prontuarioId);
        List<Prontuarios> Listar();
        List<Prontuarios> ListaByQuery();
    }
}
