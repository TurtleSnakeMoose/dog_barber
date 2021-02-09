using dog_barber.DAL;
using dog_barber.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dog_barber.Service
{
    public class AppointmentService
    {
        dogbarbermangerContext _dbc = new dogbarbermangerContext();

        public List<Appointment> GetAppointments()
        {
            var uDal = new AppointmentDAL(_dbc);
            var result = uDal.GetAppointments().Result;
            return result;
        }

        public int RemoveAppointment(int id)
        {
            var uDal = new AppointmentDAL(_dbc);
            var result = uDal.RemoveAppointment(id).Result;
            return result;
        }

        public int SaveAppointment(Appointment appt)
        {
            var uDal = new AppointmentDAL(_dbc);
            var result = uDal.SaveAppointment(appt).Result;
            return result;
        }

        public int UpdateAppointment(Appointment appt)
        {
            var uDal = new AppointmentDAL(_dbc);
            var result = uDal.UpdateAppointment(appt).Result;
            return result;
        }
    }
}
