using System;
using System.Collections.Generic;
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
    public class MedicosController : ControllerBase
    {
        private readonly IMedicosRepositorio _medicosRepositorio;

        public MedicosController()
        {
            _medicosRepositorio = new MedicosRepositorio();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_medicosRepositorio.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("MedicosInclude")]
        public IActionResult GetUsuariosInclude()
        {
            try
            {
                return Ok(_medicosRepositorio.ListarByQuery());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("SelectMedicos")]
        public IActionResult GetMedicos()
        {
            try
            {
                List<Medicos> medicos = _medicosRepositorio.Listar();

                return Ok(medicos.Select(x => new { x.Id, x.Nome }).ToList());
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
                return Ok(_medicosRepositorio.Listar().Count());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{medicoId}")]
        public IActionResult Get(int medicoId)
        {
            try
            {
                Medicos medico = _medicosRepositorio.Buscar(medicoId);

                if (medico == null)
                    return NotFound(new { mensagem = "Medico não encotrado!" });

                return Ok(medico);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Post(Medicos medico)
        {
            try
            {
                _medicosRepositorio.Cadastrar(medico);

                return Ok(medico);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Put(Medicos medico)
        {
            try
            {
                Medicos medicoEncontrado = _medicosRepositorio.Buscar(medico.Id);

                if (medicoEncontrado == null)
                    return NotFound(new { mensagem = "Medico não encontrado" });

                _medicosRepositorio.Alterar(medico);

                return Ok(medico);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{medicoId}")]
        public IActionResult Delete(int medicoId)
        {
            try
            {
                Medicos medico = _medicosRepositorio.Buscar(medicoId);

                if (medico == null)
                    return NotFound(new { mensagem = "Medico não encontrada!" });

                _medicosRepositorio.Deletar(medico);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}