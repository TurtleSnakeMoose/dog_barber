using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace dog_barber.Model.User
{
    public class AppointmentModel
    {
        [Required]
        public short Id { get; set; }

        [Required]
        public short UserId { get; set; }

        public DateTime? CreatedOn { get; set; }

        [Required]
        public DateTime? ApptDate { get; set; }
    }
}
