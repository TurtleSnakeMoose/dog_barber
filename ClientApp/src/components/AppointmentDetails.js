import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import '../style/modal.css'

const AppointmentDetails = ({modalInfo, handleCloseModal, loggedUser}) => {
    
    const history = useHistory();

    if(!loggedUser){
        history.push('/');
    }

    const apptData = modalInfo.selectedAppt
    const renderModal = () => {
        if(apptData){
            const header = `${apptData.userFirstName}'s Appointment`;
            return(
                <Modal show={modalInfo.isVisible} onHide={handleCloseModal} animation={false}>
                    <Modal.Header>
                    <Modal.Title>{header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Appointment date:<strong className="mx-2">{new Date(apptData.apptDate).toLocaleString('he-IL').replaceAll('.','/')}</strong>
                        <br/>
                        CreatedOn:<strong className="mx-2">{new Date(apptData.createdOn).toLocaleString('he-IL').replaceAll('.','/')}</strong>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        CLOSE
                    </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
        else {
            return null;
        }
    }

    return (
        <div>
            {renderModal()}
        </div>
    );
}

export default AppointmentDetails;