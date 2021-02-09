import React from 'react'
import {Navbar, Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const TopStrip = ({logout}) => {

    const ls_user = localStorage.getItem('loggedUser');
    const  loggedUser = ls_user ? JSON.parse(ls_user).user : null;

    return(
        <Navbar sticky="top">
            <Navbar.Brand onClick={logout}>
            <img
                src="logo.png"
                alt="DogBarberMngr"
            />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            {
                loggedUser ? 
                <div>
                    <Navbar.Text className="px-2">
                    Signed in as: {loggedUser.firstName}
                    </Navbar.Text>
                    <Button 
                        variant="warning"
                        onClick={logout}
                    >
                        LOGOUT
                    </Button>
                </div>
                :
                null
            }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopStrip;