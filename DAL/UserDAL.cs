using dog_barber.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using dog_barber.Helper;

namespace dog_barber.DAL
{
    public class UserDAL
    {
        private dogbarbermangerContext _dbc;

        public UserDAL(dogbarbermangerContext dbc)
        {
            _dbc = dbc;
        }

        public async Task<User> Login(string userName, string password)
        {
            var user = await _dbc.User.FirstOrDefaultAsync(x => x.UserName == userName);

            if (user == null)
                return null;

            // check if password is correct
            var helper = new EncryptionHelper();
            if (!helper.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            user.PasswordHash = new byte[0];
            user.PasswordSalt = new byte[0];
            return user;
        }

        public async Task<int> SignUp(User user, string password)
        {
            var helper = new EncryptionHelper();

            byte[] passwordHash, passwordSalt;
            helper.CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _dbc.User.Add(user);
            return await _dbc.SaveChangesAsync();
        }
    }
}
