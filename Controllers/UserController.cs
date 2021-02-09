using Microsoft.AspNetCore.Mvc;
using System;
using dog_barber.Model.User;
using dog_barber.Service;
using dog_barber.Entity;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using dog_barber.Helper;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.Extensions.Options;

namespace dog_barber.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private IUserService _userService;
        private readonly AppSettings _appSettings;

        public UserController(
            IUserService userService,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [HttpPost("[action]")]
        public IActionResult Login([FromBody] UserAuthModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var uSrv = new UserService();

                    var user = uSrv.Login(model.UserName, model.Password);

                    if (user == null)
                        return Json(new { success = false, errMsg = "User name or Password is incorrect!" });

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[] 
                        {
                            new Claim(ClaimTypes.Name, user.Id.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddDays(7),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var tokenString = tokenHandler.WriteToken(token);

                    return Json(new { success = true, user, token = tokenString});
                }

                return Json(new { success = false, errMsg = "Model is invalid"});
            }
            catch (Exception ex)
            {
                return Json(new { success = false, errMsg = ex.Message});
                throw;
            }
        }

        [HttpPost("[action]")]
        public IActionResult SignUp([FromBody] UserModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var uSrv = new UserService();

                    var userEntity = new User()
                    {
                        FirstName = model.FirstName,
                        UserName = model.UserName
                    };

                    var result = uSrv.SignUp(userEntity, model.Password);

                    return Json(new { success = true, userName = model.UserName});
                }

                return Json(new { success = false, errMsg = "Model is invalid" });
            }
            catch (Exception ex)
            {
                var errMsg = ex.InnerException.InnerException.Message.Contains("UNIQUE KEY constraint") 
                            ? 
                            "Sorry, This user already exists." 
                            : 
                            "Sign-up faild!";

                return Json(new { success = false, errMsg });
            }
        }
    }
}
