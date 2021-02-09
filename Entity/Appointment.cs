using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace dog_barber.Entity
{
    public partial class Appointment
    {
        public short Id { get; set; }
        public short UserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ApptDate { get; set; }

        [NotMapped]
        public string UserFirstName { get; set; }
    }
}
