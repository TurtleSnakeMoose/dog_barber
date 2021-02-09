using dog_barber.DAL;
using dog_barber.Entity;
using dog_barber.Helper;
using dog_barber.Model.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dog_barber.Service
{

    public interface IUserService
    {
        User Login(string userName, string password);
        int SignUp(User user, string password);
    }

    public class UserService : IUserService
    {
        dogbarbermangerContext _dbc = new dogbarbermangerContext();

        public User Login(string userName, string password)
        {
            var uDal = new UserDAL(_dbc);
            var result = uDal.Login(userName, password).Result;
            return result;
        }

        public int SignUp(User user, string password)
        {
            var uDal = new UserDAL(_dbc);
            var result = uDal.SignUp(user, password).Result;
            return result;
        }
    }
}
