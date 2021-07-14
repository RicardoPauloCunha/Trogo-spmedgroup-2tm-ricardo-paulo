using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.SpMedicalGroup.Domains;
using WebApi.SpMedicalGroup.Interfaces;
using WebApi.SpMedicalGroup.Repositorios;

namespace WebApi.SpMedicalGroup.Controllers
{
    [Authorize(Roles = "1")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProntuariosController : ControllerBase
    {
        private readonly IProntuariosRepositorio _prontuariosRepositorio;

        public ProntuariosController()
        {
            _prontuariosRepositorio = new ProntuariosRepositorio();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_prontuariosRepositorio.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("ProntuariosInclude")]
        public IActionResult GetProntuariosInclude()
        {
            try
            {
                return Ok(_prontuariosRepositorio.ListaByQuery());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("SelectProntuarios")]
        public IActionResult GetProntuarios()
        {
            try
            {
                using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
                {
                    return Ok(ctx.Prontuarios.Select(x => new { x.Id, x.Nome }).ToList());
                }
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
                return Ok(_prontuariosRepositorio.Listar().Count);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{prontuarioId}")]
        public IActionResult Get(int prontuarioId)
        {
            try
            {
                Prontuarios prontuario = _prontuariosRepositorio.Buscar(prontuarioId);

                if (prontuario == null)
                    return NotFound(new { mensagem = "Prontuario não encontrado!" });

                return Ok(prontuario);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Post(Prontuarios prontuario)
        {
            try
            {
                _prontuariosRepositorio.Cadastrar(prontuario);

                return Ok(prontuario);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Put(Prontuarios prontuario)
        {
            try
            {
                Prontuarios prontuarioEncontrado = _prontuariosRepositorio.Buscar(prontuario.Id);

                if (prontuarioEncontrado == null)
                    return NotFound(new { mensagem = "Prontuario não encontrado!"});

                _prontuariosRepositorio.Alterar(prontuario);

                return Ok(prontuario);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{prontuarioId}")]
        public IActionResult Delete(int prontuarioId)
        {
            try
            {
                Prontuarios prontuario = _prontuariosRepositorio.Buscar(prontuarioId);

                if (prontuario == null)
                    return NotFound(new { mensagem = "Prontuario não encontrada!" });

                _prontuariosRepositorio.Deletar(prontuario);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}