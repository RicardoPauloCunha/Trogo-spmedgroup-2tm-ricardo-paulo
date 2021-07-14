using WebApi.SpMedicalGroup.Domains;
using WebApi.SpMedicalGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace WebApi.SpMedicalGroup.Repositorios
{
    public class MedicosRepositorio : IMedicosRepositorio
    {
        private readonly string stringConexao = "connection-string";

        public void Alterar(Medicos medico)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Medicos.Update(medico);
                ctx.SaveChanges();
            }
        }

        public void Cadastrar(Medicos medicoRecebido)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Medicos.Add(medicoRecebido);
                ctx.SaveChanges();
            }
        }

        public void Deletar(Medicos medico)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Medicos.Remove(medico);
                ctx.SaveChanges();
            }
        }

        public Medicos Buscar(int medicoId)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Medicos.Find(medicoId);
            }
        }

        public Medicos BuscarLogado(int usuarioId)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Medicos.ToList().Find(m => m.UsuarioId == usuarioId);
            }
        }

        public List<Medicos> Listar()
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Medicos.ToList();
            }
        }

        public List<Medicos> ListarByQuery()
        {
            List<Medicos> medicos = new List<Medicos>();

            using (SqlConnection con = new SqlConnection(stringConexao))
            {
                string select = "SELECT M.Id, M.Nome, M.Crm, E.Nome AS Especialidade, " +
                    "U.Email AS Usuario, " +
                    "C.NomeFantasia AS Clinica " +
                    "FROM Medicos AS M " +
                    "JOIN Especialidades AS E " +
                    "ON M.EspecialidadeId = E.Id " +
                    "JOIN Usuarios AS U " +
                    "ON M.UsuarioId = U.Id " +
                    "JOIN Clinicas C " +
                    "ON M.ClinicaId = C.Id;";

                con.Open();

                using (SqlCommand cmd = new SqlCommand(select, con))
                {
                    SqlDataReader sqr = cmd.ExecuteReader();
                    if (sqr.HasRows)
                    {
                        while (sqr.Read())
                        {
                            Medicos medico = new Medicos()
                            {
                                Id = Convert.ToInt32(sqr["Id"]),
                                Nome = sqr["Nome"].ToString(),
                                Crm = sqr["Crm"].ToString(),
                                Especialidade = new Especialidades()
                                {
                                    Nome = sqr["Especialidade"].ToString()
                                },
                                Usuario = new Usuarios()
                                {
                                    Email = sqr["Usuario"].ToString()
                                },
                                Clinica = new Clinicas()
                                {
                                    NomeFantasia = sqr["Clinica"].ToString()
                                }
                            };
                            medicos.Add(medico);
                        }
                    }
                    return medicos;
                }
            }
        }
    }
}
