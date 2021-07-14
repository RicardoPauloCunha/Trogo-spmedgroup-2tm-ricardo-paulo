using WebApi.SpMedicalGroup.Domains;
using WebApi.SpMedicalGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace WebApi.SpMedicalGroup.Repositorios
{
    public class ProntuariosRepositorio : IProntuariosRepositorio
    {
        private readonly string stringConexao = "connection-string";

        public void Alterar(Prontuarios prontuario)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Prontuarios.Update(prontuario);
                ctx.SaveChanges();
            }
        }

        public void Cadastrar(Prontuarios prontuario)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Prontuarios.Add(prontuario);
                ctx.SaveChanges();
            }
        }

        public void Deletar(Prontuarios prontuario)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Prontuarios.Remove(prontuario);
                ctx.SaveChanges();
            }
        }

        public Prontuarios Buscar(int prontuarioId)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Prontuarios.Find(prontuarioId);
            }
        }

        public Prontuarios ProntuarioLogado(int usuarioId)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Prontuarios.ToList().Find(p => p.UsuarioId == usuarioId);
            }
        }

        public List<Prontuarios> Listar()
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Prontuarios.ToList();
            }
        }

        public List<Prontuarios> ListaByQuery()
        {
            List<Prontuarios> prontuarios = new List<Prontuarios>();

            using (SqlConnection con = new SqlConnection(stringConexao))
            {
                string select = "SELECT P.Id, P.Nome, P.Rg, P.Cpf, P.DataNascimento, P.Telefone, U.Email AS Usuario, " +
                    "P.Rua, P.Bairro, P.Cidade, P.Estado, P.Cep FROM Prontuarios AS P " +
                    "JOIN Usuarios AS U " +
                    "ON P.UsuarioId = U.Id;";

                con.Open();

                using (SqlCommand cmd = new SqlCommand(select, con))
                {
                    SqlDataReader sqr = cmd.ExecuteReader();

                    if (sqr.HasRows)
                    {
                        while (sqr.Read())
                        {
                            Prontuarios prontuario = new Prontuarios()
                            {
                                Id = Convert.ToInt32(sqr["Id"]),
                                Nome = sqr["Nome"].ToString(),
                                Rg = sqr["Rg"].ToString(),
                                Cpf = sqr["Cpf"].ToString(),
                                DataNascimento = Convert.ToDateTime(sqr["DataNascimento"]),
                                Telefone = sqr["Telefone"].ToString(),
                                Usuario = new Usuarios()
                                {
                                    Email = sqr["Usuario"].ToString()
                                },
                                Rua = sqr["Rua"].ToString(),
                                Bairro = sqr["Bairro"].ToString(),
                                Cidade = sqr["Cidade"].ToString(),
                                Estado = sqr["Estado"].ToString(),
                                Cep = sqr["Cep"].ToString(),
                            };

                            prontuarios.Add(prontuario);
                        }
                    }
                    return prontuarios;
                }
            }
        }
    }
}
