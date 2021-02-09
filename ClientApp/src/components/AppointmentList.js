import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import {Table, Spinner} from 'react-bootstrap'

import '../style/appointment-list.css'
import AppointmetListHeader from './AppointmetListHeader'
import {HttpGetDispatcher, HttpPostDispatcher} from '../helper/HttpRequestDispatcher'
import AppointmentDetails from './AppointmentDetails'

const AppointmentList = ({toaster}) => {

    const history = useHistory();
    const [apptList, setApptList] = useState([]); // static list of appointments (not for displaying)
    const [filteredApptList, setFilteredApptList] = useState([]); // displayed list of appointments (filtered inline while typing)
    const [fetchComplete, setFetchComplete] = useState(false);
    const [modalData, setModalData] = useState({isVisible:false, selectedAppt:null});
    
    const ls_user = localStorage.getItem('loggedUser');
    var  loggedUser = null
    if (!ls_user)
        history.push('/');
    else
        loggedUser = JSON.parse(ls_user).user


    useEffect(() => {

        // get all appointments on first render.
        HttpGetDispatcher('api/Appointment/GetAppointments',
        (response) => {
            setApptList(response.appts);
            setFilteredApptList(response.appts);
            setFetchComplete(true);
        }, 
        (response) => {
            setFetchComplete(true);
            toaster('Failed fetching list', 'Something went wrong');
            history.push('/');
        });

    },[])

    // filter the displayed list while typing/choosing date.
    const filterList = (filterData) => {
        if(filterData.fltr_name.length === 0 && filterData.fltr_date.length === 0){
            setFilteredApptList(apptList);
        }
        else{
            const filterResult = apptList.filter(appt => 
                (filterData.fltr_name.length === 0 || appt.userFirstName.toLowerCase().indexOf(filterData.fltr_name.toLowerCase()) > -1)
                &&
                (filterData.fltr_date.length === 0 || new Date(appt.apptDate).toLocaleDateString() === new Date(filterData.fltr_date).toLocaleDateString())
            );
            setFilteredApptList(filterResult);
        }
    }

    // show appt info modal.
    const onClickApptRow = (appt) => {
        setModalData({isVisible: true, selectedAppt: appt});
    }

    //close modal window.
    const handleCloseModal = () => {
        setModalData({isVisible: false, selectedAppt: null});
    }

    // navigate to editAppointment component.
    const onClickEditAppt = (e, appt) => {
        e.stopPropagation();
        history.push({
            pathname: '/appt-create-edit',
            state: { 
                appt: appt,
                loggedUser: loggedUser
             }
        });
    }   
    
    // handle remove appt, remove from db => onSuccess: remove from staticList and from filteredList
    const onClickRemoveAppt = (e, appt) => {
        e.stopPropagation();
        HttpPostDispatcher('api/Appointment/RemoveAppointment', appt, (data) => {
            setFilteredApptList(filteredApptList.filter(x => x.id !== appt.id));
            setApptList(apptList.filter(x => x.id !== appt.id));
        }, 
        (data) => {
            //do nothing.
        });
    }

    const renderTableRows = filteredApptList.map((appt, index) => {
        return (
            <tr key={appt.id} style={{cursor:'pointer'}} onClick={e => onClickApptRow(appt)}>
                <td style={{width:"50px"}}>{index+1}</td>
                <td>{appt.userFirstName}</td>
                <td>{new Date(appt.apptDate).toLocaleString('he-IL').replaceAll('.','/')}</td>
                <td className="td-appt-actions">{appt.userId === loggedUser.id ?
                    <div>
                        <span className="mx-2 appt-action" onClick={e => onClickEditAppt(e, appt)}>Edit</span>
                        |
                        <span className="mx-2 appt-action" onClick={e => onClickRemoveAppt(e, appt)}>Remove</span>
                    </div> 
                    : 
                    null}
                 </td>
            </tr>
        );
    });

    const renderTable = () => {
        if(!fetchComplete){
            return <Spinner animation="border" />;
        }
        else if (filteredApptList.length === 0){
            return <div className="no-data"><i>No appointments found.</i></div>
        }
        else {
            return(
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{width:"50px"}}>#</th>
                                <th>First Name</th>
                                <th>Appointment date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows}
                        </tbody>
                    </Table>
                    <AppointmentDetails 
                        modalInfo={modalData}
                        handleCloseModal={handleCloseModal}
                        loggedUser={loggedUser}
                    />
                </div>
            );
        }
    }

    return (
        <div className="appointment-list">
            <AppointmetListHeader filterList={filterList} />
            {renderTable()}
        </div>
    );
}

export default AppointmentList;