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
    public class ClinicasController : ControllerBase
    {
        private readonly IClinicasRepositorio _clinicasRepositorio;
        
        public ClinicasController()
        {
            _clinicasRepositorio = new ClinicasRepositorio();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_clinicasRepositorio.ListarIncludesMedico());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("SelectClinicas")]
        public IActionResult GetClinicas()
        {
            try
            {
                List<Clinicas> clinicas = _clinicasRepositorio.Listar();

                return Ok(clinicas.Select(x => new { x.Id, x.NomeFantasia }).ToList());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{clinicaId}")]
        public IActionResult Get(int clinicaId)
        {
            try
            {
                Clinicas clinica = _clinicasRepositorio.Buscar(clinicaId);

                if (clinica == null)
                    return NotFound(new { mensagem = "Clinica não encontrada!" });

                return Ok(clinica);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Post(Clinicas clinica)
        {
            try
            {
                _clinicasRepositorio.Cadastrar(clinica);

                return Ok(clinica);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Put(Clinicas clinica)
        {
            try
            {
                Clinicas clinicaEncontrada = _clinicasRepositorio.Buscar(clinica.Id);

                if (clinicaEncontrada == null)
                    return NotFound(new { mensagem = "Clinica não encontrada!" });

                _clinicasRepositorio.Alterar(clinica);

                return Ok(clinica);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{clinicaId}")]
        public IActionResult Delete(int clinicaId)
        {
            try
            {
                Clinicas clinica = _clinicasRepositorio.Buscar(clinicaId);

                if (clinica == null)
                    return NotFound(new { mensagem = "Clinica não encontrada!" });

                _clinicasRepositorio.Deletar(clinica);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}