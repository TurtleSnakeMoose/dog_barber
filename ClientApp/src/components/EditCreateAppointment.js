import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'

import '../style/edit-create-appt.css'
import {HttpPostDispatcher as httpPost} from '../helper/HttpRequestDispatcher'

const EditCreateAppointment = ({toaster}) => {

    const history = useHistory();
    const location = useLocation();
    const [appointmentDate, setAppointmentDate] = useState(!location.state.appt ? '' : location.state.appt.apptDate);

    const ls_user = localStorage.getItem('loggedUser');
    var  loggedUser = null
    if (!ls_user)
        history.push('/');
    else
        loggedUser = JSON.parse(ls_user).user


    const renderTitle = () => {
        return !!location.state.appt 
                ?
                <h3>Editing {loggedUser.firstName}'s appointment</h3> 
                :
                <h3>New Appointment for {loggedUser.firstName}</h3>;
    }

    const submitForm = (e) => {
        e.preventDefault();

        const editedAppointment = location.state.appt;
        const isEdit = !!editedAppointment;
        const apptData = {
                Id: isEdit ? editedAppointment.id : 0,
                UserId: loggedUser.id,
                CreatedOn: isEdit ? editedAppointment.CreatedOn : null,
                ApptDate: new Date(appointmentDate)
            };

        httpPost('api/Appointment/SaveAppointment', apptData, 
        (response) => {
            history.goBack();
        },
         (response) => {
            toaster('Saving appointment failed', 'something went wrong');
         });
    }

    return (
        <Form className="edit-create-appt">
            <div className="title">
                {renderTitle()}
            </div>
            <Form.Group controlId="frmAppt-apptDate">
                <Form.Label>Appointment date</Form.Label>
                <Form.Control 
                    type="datetime-local" 
                    value={appointmentDate}
                    onChange={e => setAppointmentDate(e.target.value)}
                />
            </Form.Group>
            <Button 
                variant="primary"
                onClick={e => submitForm(e)}
                type="Submit"
            >
                SAVE
            </Button>
            <Button 
                className="mx-3"
                variant="outline-primary"
                onClick={() => history.goBack()}
            >
                BACK
            </Button>
        </Form>
    );
}

export default EditCreateAppointment;