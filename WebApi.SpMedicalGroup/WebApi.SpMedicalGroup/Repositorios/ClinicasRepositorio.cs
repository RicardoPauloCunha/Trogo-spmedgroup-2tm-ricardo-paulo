using Microsoft.EntityFrameworkCore;
using WebApi.SpMedicalGroup.Domains;
using WebApi.SpMedicalGroup.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace WebApi.SpMedicalGroup.Repositorios
{
    public class ClinicasRepositorio : IClinicasRepositorio
    {
        public void Cadastrar(Clinicas clinica)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Clinicas.Add(clinica);
                ctx.SaveChanges();
            }
        }

        public void Deletar(Clinicas clinica)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Clinicas.Remove(clinica);
                ctx.SaveChanges();
            }
        }

        public void Alterar(Clinicas clinica)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Clinicas.Update(clinica);
                ctx.SaveChanges();
            }
        }

        public Clinicas Buscar(int clinicaId)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Clinicas.Find(clinicaId);
            }
        }

        public List<Clinicas> Listar()
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Clinicas.ToList();
            }
        }

        public List<Clinicas> ListarIncludesMedico()
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return ctx.Clinicas
                    .Include(x => x.Medicos)
                    .ToList();
            }
        }
    }
}
