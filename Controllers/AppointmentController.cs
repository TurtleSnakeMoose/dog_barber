using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dog_barber.Model.User;
using dog_barber.Service;
using dog_barber.Entity;
using Microsoft.AspNetCore.Authorization;

namespace dog_barber.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppointmentController : Controller
    {

        [HttpGet("[action]")]
        public IActionResult GetAppointments()
        {
            try
            {
                var uSrv = new AppointmentService();
                var appts = uSrv.GetAppointments();

                return Json(new { success = true, appts });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, errMsg = ex.Message });
                throw;
            }
        }

        [HttpPost("[action]")]
        public IActionResult RemoveAppointment([FromBody] AppointmentModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var uSrv = new AppointmentService();
                    var result = uSrv.RemoveAppointment(model.Id);

                    return Json(new { success = result > 0 });
                }

                return Json(new { success = false, errMsg = "Appointment data is invalid" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, errMsg = ex.Message });
                throw;
            }
        }

        [HttpPost("[action]")]
        public IActionResult SaveAppointment([FromBody] AppointmentModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Appointment apptEntity = new Appointment()
                    {
                        Id = model.Id,
                        UserId = model.UserId,
                        ApptDate = model.ApptDate.Value.ToLocalTime(),
                        CreatedOn = DateTime.Now.ToLocalTime()
                    };

                    var uSrv = new AppointmentService();
                    var result = 0;

                    if (apptEntity.Id > 0)
                        result = uSrv.UpdateAppointment(apptEntity);
                    else
                        result = uSrv.SaveAppointment(apptEntity);

                    return Json(new { success = result > 0 });
                }

                return Json(new { success = false, errMsg = "Appointment data is invalid" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, errMsg = ex.Message });
                throw;
            }
        }
    }
}
