import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'

import {HttpPostDispatcher} from '../helper/HttpRequestDispatcher'

const SignupPage = ({toaster}) => {

    const history = useHistory();
    const [strFirstName, setStrFirstName] = useState('');
    const [strUsername, setStrUsername] = useState('');
    const [strPassword, setStrPassword] = useState('');

    const signUpSubmit = () => {
        const data = { FirstName: strFirstName, UserName: strUsername, Password: strPassword };
        const allowAnonymous = true;
        HttpPostDispatcher('/api/User/SignUp', data, 
        (response) => {
            toaster('User created successfuly!',`The user ${response.userName} was created, please login.`);
            history.push('/');
        }, 
        (response) => {
            toaster('User creation failed!',response.errMsg);
        },allowAnonymous);
    };

    return (
        <Form>
            <Form.Group controlId="frmSignUp-FirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="Dog's first name" 
                    autoComplete="off"
                    value={strFirstName}
                    onChange={e => setStrFirstName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="frmSignUp-userName">
                <Form.Label>User Name</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="User Name" 
                    autoComplete="off"
                    value={strUsername}
                    onChange={e => setStrUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="frmSignUp-password">
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
                disabled={strFirstName.trim().length === 0 || strUsername.trim().length === 0 || strPassword.trim().length === 0 }
                variant="primary"
                onClick={signUpSubmit}
                >
                SIGN-UP
            </Button>
            <Link to="/" className="mx-3">
                Back to login
            </Link>
        </Form>
    );
}

export default SignupPage;