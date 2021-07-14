using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.SpMedicalGroup.ViewModel
{
    public class CurrentDateAttribute : ValidationAttribute
    {
        public CurrentDateAttribute()
        {

        }

        public override bool IsValid(object value)
        {
            var data = (DateTime)value;

            if (data <= DateTime.Now)
            {
                return true;
            }

            return false;
        }
    }
}
