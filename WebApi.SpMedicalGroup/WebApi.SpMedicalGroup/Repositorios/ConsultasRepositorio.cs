using WebApi.SpMedicalGroup.Domains;
using WebApi.SpMedicalGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace WebApi.SpMedicalGroup.Repositorios
{
    public class ConsultasRepositorio : IConsultasRepositorio
    {
        private readonly string stringConexao = "connection-string";

        public void Alterar(Consultas consulta)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Update(consulta);
                ctx.SaveChanges();
            }
        }

        public void Cadastrar(Consultas consulta)
        {
            consulta.SituacaoId = 1;

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Add(consulta);
                ctx.SaveChanges();
            }
        }

        public void Deletar(Consultas consulta)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Remove(consulta);
                ctx.SaveChanges();
            }
        }

        public Consultas AlterarDecricao(string descricao, Consultas consulta)
        {
            consulta.Descricao = descricao;

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Update(consulta);
                ctx.SaveChanges();
            }

            return consulta;
        }

        public Consultas AlterarSituacao(int situacaoId, Consultas consulta)
        {
            consulta.SituacaoId = situacaoId;

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Update(consulta);
            }

            return consulta;
        }

        public Consultas Buscar(int consultaId)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Consultas.Find(consultaId);
            }
        }

        public List<Consultas> ListarRelacionadas(int tipoUsuarioId, int medicoProntuarioId)
        {
            if (tipoUsuarioId == 2)
            {
                using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
                {
                    return ctx.Consultas.ToList().FindAll(c => c.MedicoId == medicoProntuarioId);
                }
            }
            else if (tipoUsuarioId == 3)
            {
                using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
                {
                    return ctx.Consultas.ToList().FindAll(c => c.ProntuarioId == medicoProntuarioId);
                }
            }
            else
            {
                return new List<Consultas>();
            }
        }

        public List<Consultas> Listar()
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Consultas.ToList();
            }
        }

        public List<Consultas> ListarByQuery()
        {
            List<Consultas> consultas = new List<Consultas>();

            using (SqlConnection con = new SqlConnection(stringConexao))
            {
                string select = "SELECT C.Id, P.Nome AS Prontuario, " +
                    "M.Nome AS Medico, " +
                    "C.DataAgendada, C.HoraAgendada, S.Nome AS Situacoes, " +
                    "C.Descricao FROM Consultas C " +
                    "JOIN Prontuarios AS P " +
                    "ON C.ProntuarioId = P.Id " +
                    "JOIN Medicos AS M " +
                    "ON C.Medicoid = M.Id " +
                    "JOIN Situacoes S " +
                    "ON C.SituacaoId = S.Id;";

                con.Open();

                using (SqlCommand cmd = new SqlCommand(select, con))
                {
                    SqlDataReader sqr = cmd.ExecuteReader();

                    if (sqr.HasRows)
                    {
                        while (sqr.Read())
                        {
                            var hora = sqr["HoraAgendada"];
                            TimeSpan horaSpan = (TimeSpan)Convert.ChangeType(hora, typeof(TimeSpan));

                            Consultas consulta = new Consultas()
                            {
                                Id = Convert.ToInt32(sqr["Id"]),
                                Prontuario = new Prontuarios()
                                {
                                    Nome = sqr["Prontuario"].ToString()
                                },
                                Medico = new Medicos()
                                {
                                    Nome = sqr["Medico"].ToString()
                                },
                                DataAgendada = Convert.ToDateTime(sqr["DataAgendada"]),
                                HoraAgendada = horaSpan,
                                Situacao = new Situacoes()
                                {
                                    Nome = sqr["Situacao"].ToString(),
                                },
                                Descricao = sqr["Descricao"].ToString()
                            };

                            consultas.Add(consulta);
                        }
                    }
                    return consultas;
                }
            }
        }

        public List<Consultas> ListarRelacionadasByQuery(int tipoUsuarioId, int medicoProntuarioId)
        {
            List<Consultas> consultas = new List<Consultas>();

            if (tipoUsuarioId == 2)
            {
                using (SqlConnection con = new SqlConnection(stringConexao))
                {
                    string select = "SELECT C.Id, P.Nome AS Prontuario, " +
                        "M.Nome AS Medico, " +
                        "C.DataAgendada, C.HoraAgendada, S.Nome AS SITUACAO, " +
                        "C.Descricao FROM Consultas AS C " +
                        "JOIN Prontuarios AS P " +
                        "ON C.ProntuarioId = P.Id " +
                        "JOIN Medicos AS M " +
                        "ON C.Medicoid = M.Id " +
                        "JOIN Situacoes AS S " +
                        "ON C.SituacaoId = S.Id " +
                        "WHERE C.MedicoId = @UsuarioIdLog;";

                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(select, con))
                    {
                        cmd.Parameters.AddWithValue("UsuarioIdLog", medicoProntuarioId);

                        SqlDataReader sqr = cmd.ExecuteReader();

                        if (sqr.HasRows)
                        {
                            while (sqr.Read())
                            {
                                var hora = sqr["HoraAgendada"];
                                TimeSpan horaSpan = (TimeSpan)Convert.ChangeType(hora, typeof(TimeSpan));

                                Consultas consulta = new Consultas()
                                {
                                    Id = Convert.ToInt32(sqr["ID"]),
                                    Prontuario = new Prontuarios()
                                    {
                                        Nome = sqr["Prontuario"].ToString()
                                    },
                                    Medico = new Medicos()
                                    {
                                        Nome = sqr["Medico"].ToString()
                                    },
                                    DataAgendada = Convert.ToDateTime(sqr["DataAgendada"]),
                                    HoraAgendada = horaSpan,
                                    Situacao = new Situacoes()
                                    {
                                        Nome = sqr["Situacao"].ToString(),
                                    },
                                    Descricao = sqr["Descricao"].ToString()
                                };

                                consultas.Add(consulta);
                            }
                        }
                        return consultas;
                    }
                }
            }
            else if (tipoUsuarioId == 3)
            {
                using (SqlConnection con = new SqlConnection(stringConexao))
                {
                    string select = "SELECT C.Id, P.Nome AS Prontuario, " +
                        "M.Nome AS Medico, " +
                        "C.DataAgendada, C.HoraAgendada, S.Nome AS Situacao, " +
                        "C.Descricao FROM Consultas C " +
                        "JOIN Prontuarios AS P " +
                        "ON C.ProntuarioId = P.Id " +
                        "JOIN Medicos AS M " +
                        "ON C.MedicoId = M.ID " +
                        "JOIN Situacao AS S " +
                        "ON C.SituacaoId = S.Id " +
                        "WHERE C.ProntuarioId = @UsuarioIdLog;";
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(select, con))
                    {
                        cmd.Parameters.AddWithValue("UsuarioIdLog", medicoProntuarioId);

                        SqlDataReader sqr = cmd.ExecuteReader();

                        if (sqr.HasRows)
                        {
                            while (sqr.Read())
                            {
                                var hora = sqr["HoraAgendada"];
                                TimeSpan horaSpan = (TimeSpan)Convert.ChangeType(hora, typeof(TimeSpan));
                                Consultas consulta = new Consultas()
                                {
                                    Id = Convert.ToInt32(sqr["Id"]),
                                    Prontuario = new Prontuarios()
                                    {
                                        Nome = sqr["Prontuario"].ToString()
                                    },
                                    Medico = new Medicos()
                                    {
                                        Nome = sqr["Medico"].ToString()
                                    },
                                    DataAgendada = Convert.ToDateTime(sqr["DataAgendada"]),
                                    HoraAgendada = horaSpan,
                                    Situacao = new Situacoes()
                                    {
                                        Nome = sqr["Situacao"].ToString(),
                                    },
                                    Descricao = sqr["Descricao"].ToString()
                                };

                                consultas.Add(consulta);
                            }
                        }
                        return consultas;
                    }
                }
            }
            return null;
        }
    }
}
