import React from 'react'
import {Toast} from 'react-bootstrap'

const ToastAlert = ({toastData}) => {

    return (
        <Toast style={{marginRight:'auto', marginLeft:'auto', marginTop:'15px'}} onClose={() => {toastData.handleClose()}} show={toastData.show} delay={4500} autohide>
            <Toast.Header>
            <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
            />
            <strong className="mr-auto">{toastData.title}</strong>
            </Toast.Header>
            <Toast.Body>{toastData.body}</Toast.Body>
        </Toast>
    );
}

export default ToastAlert;