using System;
using Microsoft.AspNetCore.Mvc;
using WebApi.SpMedicalGroup.Interfaces;
using WebApi.SpMedicalGroup.Repositorios;

namespace WebApi.SpMedicalGroup.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TiposUsuariosController : ControllerBase
    {
        private readonly ITiposUsuariosRepositorio _tiposUsuariosRepositorio;

        public TiposUsuariosController()
        {
            _tiposUsuariosRepositorio = new TiposUsuariosRepositorio();
        }

        [HttpGet]
        public IActionResult GetTiposUsuarios()
        {
            try
            {
                return Ok(_tiposUsuariosRepositorio.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}