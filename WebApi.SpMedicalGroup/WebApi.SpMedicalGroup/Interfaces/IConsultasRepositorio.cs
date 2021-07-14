using WebApi.SpMedicalGroup.Domains;
using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Interfaces
{
    interface IConsultasRepositorio
    {
        void Cadastrar(Consultas consulta);
        void Alterar(Consultas consulta);
        void Deletar(Consultas consulta);
        Consultas Buscar(int consultaId);
        Consultas AlterarDecricao(string descricao, Consultas consulta);
        Consultas AlterarSituacao(int situacaoId, Consultas consulta);
        List<Consultas> Listar();
        List<Consultas> ListarRelacionadas(int tipoUsuarioId, int medicoProntuarioId);
        List<Consultas> ListarByQuery();
        List<Consultas> ListarRelacionadasByQuery(int tipoUsuarioId, int medicoProntuarioId);
    }
}
