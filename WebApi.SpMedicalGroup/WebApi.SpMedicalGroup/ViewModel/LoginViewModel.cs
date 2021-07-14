using System.ComponentModel.DataAnnotations;

namespace WebApi.SpMedicalGroup.ViewModel
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Email deve ser informado.")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Senha deve ser informada")]
        [DataType(DataType.Password)]
        [StringLength(30, MinimumLength = 4, ErrorMessage = "Senha deve possuir pelo menos 4 caracteres.")]
        public string Senha { get; set; }
    }
}
