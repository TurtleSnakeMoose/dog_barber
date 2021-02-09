using dog_barber.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace dog_barber.DAL
{
    public class AppointmentDAL
    {
        private dogbarbermangerContext _dbc;

        public AppointmentDAL(dogbarbermangerContext dbc)
        {
            _dbc = dbc;
        }

        public async Task<List<Appointment>> GetAppointments()
        {
            var users = await _dbc.User.ToListAsync();

            var appointments = await _dbc.Set<Appointment>()
                                         .FromSql("spGetAppointments")
                                         .OrderBy(appt => appt.ApptDate)
                                         .ToListAsync();

            // couple user.firstName with appointment by appointment.userID
            // sadly [NotMapped] attribute at Appointment entity, "blocks" querying data into that property.
            appointments.ForEach(appt => appt.UserFirstName = users.FirstOrDefault(user => user.Id == appt.UserId).FirstName);

            return appointments;
        }

        public async Task<int> RemoveAppointment(int id)
        {
            Appointment appt = new Appointment() { Id = (short)id };
            _dbc.Appointment.Attach(appt);
            _dbc.Appointment.Remove(appt);
            return await _dbc.SaveChangesAsync();
        }

        public async Task<int> SaveAppointment(Appointment appt)
        {
            await _dbc.Appointment.AddAsync(appt);
            return await _dbc.SaveChangesAsync();
        }

        public async Task<int> UpdateAppointment(Appointment appt)
        {
            _dbc.Appointment.Update(appt);
            return await _dbc.SaveChangesAsync();
        }
    }
}
