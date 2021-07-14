using WebApi.SpMedicalGroup.Domains;
using WebApi.SpMedicalGroup.ViewModel;
using System.Collections.Generic;

namespace WebApi.SpMedicalGroup.Interfaces
{
    interface IUsuariosRepositorio
    {
        void Cadastrar(Usuarios usuario);
        void Alterar(Usuarios usuario);
        void Deletar(Usuarios usuario);
        Usuarios Buscar(int usuarioId);
        Usuarios Logar(LoginViewModel login);
        List<Usuarios> Listar();
        List<Usuarios> ListarIncluesMedicoAndProntuario();
        List<Usuarios> ListarByQuery();
    }
}
