using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.SpMedicalGroup.Domains;
using WebApi.SpMedicalGroup.Interfaces;
using WebApi.SpMedicalGroup.Repositorios;

namespace WebApi.SpMedicalGroup.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private readonly IConsultasRepositorio _consultasRepositorio;

        public ConsultasController()
        {
            _consultasRepositorio = new ConsultasRepositorio();
        }

        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_consultasRepositorio.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("ConsultasInclude")]
        public IActionResult GetConsultasInclude()
        {
            try
            {
                return Ok(_consultasRepositorio.ListarByQuery());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("Count")]
        public IActionResult GetCount()
        {
            try
            {
                return Ok(_consultasRepositorio.Listar().Count());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Consultas consulta)
        {
            try
            {
                _consultasRepositorio.Cadastrar(consulta);

                return Ok(consulta);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "1")]
        [HttpPut]
        public IActionResult Put(Consultas consulta)
        {
            try
            {
                Consultas consultaEncontrada = _consultasRepositorio.Buscar(consulta.Id);

                if (consultaEncontrada == null)
                    return NotFound(new { mensagem = "Consulta não encontrada!" });

                _consultasRepositorio.Alterar(consulta);

                return Ok(consulta);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "2")]
        [HttpPut("/AlterarDescricaoConsulta")]
        public IActionResult AlterarDescricaoConsulta(Consultas consulta)
        {
            try
            {
                Consultas consultaEncontrada = _consultasRepositorio.Buscar(consulta.Id);

                if (consultaEncontrada == null)
                    return NotFound(new { mensagem = "Consulta não encontrada!" });

                Consultas consultaAlterada = _consultasRepositorio.AlterarDecricao(consulta.Descricao, consultaEncontrada);

                return Ok(consultaAlterada);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "1, 2")]
        [HttpPut("/AlterarSituacaoConsulta")]
        public IActionResult AlterarSituacaoConsulta(Consultas consulta)
        {
            try
            {
                Consultas consultaEncontrada = _consultasRepositorio.Buscar(consulta.Id);

                if (consultaEncontrada == null)
                    return NotFound(new { mensagem = "Consulta não encontrada!" });

                int usuarioLog = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                if (consulta.SituacaoId == 3 && usuarioLog != 1)
                    return NotFound(new { mensagem = "Você não possui autorização para cancelar essa Consulta." });

                Consultas consultaAlterada = _consultasRepositorio.AlterarSituacao(consulta.SituacaoId, consultaEncontrada);

                return Ok(consultaAlterada);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "1")]
        [HttpDelete("{consultaId}")]
        public IActionResult Delete(int consultaId)
        {
            try
            {
                Consultas consulta = _consultasRepositorio.Buscar(consultaId);

                if (consulta == null)
                    return NotFound(new { mensagem = "Consulta não encontrada!"});

                _consultasRepositorio.Deletar(consulta);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "1")]
        [HttpGet("{consultaId}")]
        public IActionResult GetConsulta(int consultaId)
        {
            try
            {
                Consultas consulta = _consultasRepositorio.Buscar(consultaId);

                if (consulta == null)
                    return NotFound(new { mensagem = "Consulta não encontrada!" });

                return Ok(consulta);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "2, 3")]
        [HttpGet("/BuscarConsultasDeUsuario")]
        public IActionResult GetConsultasUsuario()
        {
            try
            {
                MedicosRepositorio medicoRep = new MedicosRepositorio();
                ProntuariosRepositorio prontuarioRep = new ProntuariosRepositorio();

                int usuarioId = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                int usuarioTipo = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == "UsuarioTipo").Value);

                List<Consultas> consultas = new List<Consultas>();

                if (usuarioTipo == 1)
                {
                    return NotFound(new { mensagem = "O usuriário Administrador não possui consultas agendadas" });
                }
                else if (usuarioTipo == 2)
                {
                    Medicos medicoLog = medicoRep.BuscarLogado(usuarioId);
                    consultas = _consultasRepositorio.ListarRelacionadas(usuarioTipo, medicoLog.Id);
                }
                else if (usuarioTipo == 3)
                {
                    Prontuarios pacienteLog = prontuarioRep.ProntuarioLogado(usuarioId);
                    consultas = _consultasRepositorio.ListarRelacionadas(usuarioTipo, pacienteLog.Id);
                }
                else
                {
                    return NotFound(new { mensagem = "Usuario não encotrado!" });
                }
                
                if (consultas == null)
                    return NotFound(new { mensagem = "Não foram encotradas consultas referentes a esse Usuario." });
                else if (consultas.Count() == 0)
                    return Ok(new { mensagem = "Usuario não possui nenhuma consulta agendada." });

                return Ok(consultas);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("ConsultasUsuarioInclude")]
        public IActionResult GetConsultasUsuarioInclude()
        {
            try
            {
                MedicosRepositorio medicoRep = new MedicosRepositorio();
                ProntuariosRepositorio prontuarioRep = new ProntuariosRepositorio();

                int usuarioId = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                int usuarioTipo = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == "UsuarioTipo").Value);

                List<Consultas> consultasUsuarios = new List<Consultas>();

                if (usuarioTipo == 1)
                {
                    return NotFound(new { mensagem = "O usuriário Administrador não possui consultas agendadas" });
                }
                else if (usuarioTipo == 2)
                {
                    Medicos medicoLog = medicoRep.BuscarLogado(usuarioId);
                    return Ok(_consultasRepositorio.ListarRelacionadasByQuery(usuarioTipo, medicoLog.Id));
                }
                else if (usuarioTipo == 3)
                {
                    Prontuarios pacienteLog = prontuarioRep.ProntuarioLogado(usuarioId);
                    return Ok(_consultasRepositorio.ListarRelacionadasByQuery(usuarioTipo, pacienteLog.Id));
                }
           
                return NotFound(new { mensagem = "Usuario não encotrado!" });
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}