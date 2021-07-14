using System;
using Microsoft.AspNetCore.Mvc;
using WebApi.SpMedicalGroup.Interfaces;
using WebApi.SpMedicalGroup.Repositorios;

namespace WebApi.SpMedicalGroup.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EspecialidadesController : ControllerBase
    {
        private readonly IEspecialidadesRepositorio _especialidadesRepositorio;

        public EspecialidadesController()
        {
            _especialidadesRepositorio = new EspecialidadesRepositorio();
        }

        [HttpGet]
        public IActionResult GetEspecilidades()
        {
            try
            {
                return Ok(_especialidadesRepositorio.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}