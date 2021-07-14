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
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuariosRepositorio _usuariosRepositorio;

        public UsuariosController()
        {
            _usuariosRepositorio = new UsuariosRepositorio();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_usuariosRepositorio.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("UsuariosInclude")]
        public IActionResult GetUsuariosInclude()
        {
            try
            {
                return Ok(_usuariosRepositorio.ListarByQuery());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("SelectUsuarios")]
        public IActionResult GetUsuarios()
        {
            try
            {
                List<Usuarios> usuarios = _usuariosRepositorio.Listar();

                return Ok(usuarios.Select(x => new { x.Id, x.Email }).ToList());
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
                return Ok(_usuariosRepositorio.Listar().Count());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{usuarioId}")]
        public IActionResult GetUsuario(int usuarioId)
        {
            try
            {
                Usuarios usuario = _usuariosRepositorio.Buscar(usuarioId);

                if (usuario == null)
                    return NotFound(new { mensagem = "Usuário não encontrada!" });

                return Ok(usuario);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("/UsuariosPacientesMedicos")]
        public IActionResult GetUserPacMedCorr()
        {
            try
            {
                return Ok(_usuariosRepositorio.ListarIncluesMedicoAndProntuario());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Post(Usuarios usuario)
        {
            try
            {
                _usuariosRepositorio.Cadastrar(usuario);

                return Ok(usuario);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Put(Usuarios usuario)
        {
            try
            {
                Usuarios usuarioEncontrado = _usuariosRepositorio.Buscar(usuario.Id);

                if (usuarioEncontrado == null)
                    return NotFound(new { mensagem = "Usuário não encotrado!" });

                _usuariosRepositorio.Alterar(usuario);

                return Ok(usuario);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{usuarioId}")]
        public IActionResult Delete(int usuarioId)
        {
            try
            {
                Usuarios usuario = _usuariosRepositorio.Buscar(usuarioId);

                if (usuario == null)
                    return NotFound(new { mensagem = "Usuario não encontrada!" });

                _usuariosRepositorio.Deletar(usuario);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}