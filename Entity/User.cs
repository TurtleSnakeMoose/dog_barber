using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace dog_barber.Entity
{
    public partial class User
    {
        public short Id { get; set; }
        public string FirstName { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
