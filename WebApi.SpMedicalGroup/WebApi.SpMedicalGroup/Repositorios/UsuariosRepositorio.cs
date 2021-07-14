using Microsoft.EntityFrameworkCore;
using WebApi.SpMedicalGroup.Domains;
using WebApi.SpMedicalGroup.Interfaces;
using WebApi.SpMedicalGroup.ViewModel;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace WebApi.SpMedicalGroup.Repositorios
{
    public class UsuariosRepositorio : IUsuariosRepositorio
    {
        private readonly string stringConexao = "connection-string";

        public void Alterar(Usuarios usuario)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Usuarios.Update(usuario);
                ctx.SaveChanges();
            }
        }

        public void Cadastrar(Usuarios usuario)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();
            }
        }

        public void Deletar(Usuarios usuario)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Usuarios.Remove(usuario);
                ctx.SaveChanges();
            }
        }

        public Usuarios Buscar(int usuarioId)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Usuarios.Find(usuarioId);
            }
        }

        public Usuarios Logar(LoginViewModel login)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Usuarios.ToList().Find(u => u.Email == login.Email && u.Senha == login.Senha);
            }
        }

        public List<Usuarios> Listar()
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Usuarios.ToList();
            }
        }

        public List<Usuarios> ListarIncluesMedicoAndProntuario()
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Usuarios
                    .Include(x => x.Prontuarios)
                    .Include(x => x.Medicos)
                    .ToList();
            }
        }

        public List<Usuarios> ListarByQuery()
        {
            List<Usuarios> usuarios = new List<Usuarios>();

            using (SqlConnection con = new SqlConnection(stringConexao))
            {
                string select = "SELECT U.Id, U.Email, U.Senha, T.Nome AS TipoUsuario " +
                    "FROM Usuarios AS U " +
                    "JOIN TiposUsuarios AS T " +
                    "ON U.TipoUsuarioId = T.Id;";

                con.Open();

                using (SqlCommand cmd = new SqlCommand(select, con))
                {
                    SqlDataReader sqr = cmd.ExecuteReader();
                    if(sqr.HasRows)
                    {
                        while (sqr.Read())
                        {
                            Usuarios usuario = new Usuarios()
                            {
                                Id = Convert.ToInt32(sqr["Id"]),
                                Email = sqr["Email"].ToString(),
                                Senha = sqr["Senha"].ToString(),
                                TipoUsuario = new TiposUsuarios()
                                {
                                    Nome = sqr["TipoUsuario"].ToString()
                                }
                            };
                            usuarios.Add(usuario);
                        }
                    }
                    return usuarios;
                }
            }
        }
    }
}
