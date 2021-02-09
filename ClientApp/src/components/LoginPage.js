import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const LoginPage = ({login}) => {

    const [strUsername, setStrUsername] = useState('');
    const [strPassword, setStrPassword] = useState('');

   
    return (
        <Form>
            <Form.Group controlId="frmLogin-userName">
                <Form.Label>User Name</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="User Name" 
                    value={strUsername}
                    autoComplete="off"
                    onChange={e => setStrUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="frmLogin-password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    placeholder="Password" 
                    autoComplete="off"
                    value={strPassword}
                    onChange={e => setStrPassword(e.target.value)}
                />
            </Form.Group>
            <Button 
                disabled={strUsername.trim().length === 0 || strPassword.trim().length === 0 }
                variant="primary"
                onClick={(e) => login(e, strUsername, strPassword)}
                type="Submit"
                >
                LOGIN
            </Button>
            <Link to="/signup" className="mx-3">
                New? create account
            </Link>
        </Form>
    );
}

export default LoginPage;