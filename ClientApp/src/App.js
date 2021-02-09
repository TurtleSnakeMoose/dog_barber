import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import { useHistory } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap'

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AppointmentList from './components/AppointmentList';
import AppointmentDetails from './components/AppointmentDetails';
import EditCreateAppointment from './components/EditCreateAppointment';
import GenericNotFound from './components/PageNotFound';

import './style/app.css'
import ToastAlert from './components/shared/ToastAlert'
import TopStrip from './components/shared/TopStrip'
import {HttpPostDispatcher} from './helper/HttpRequestDispatcher'


const  App = () => {

  const history = useHistory();
  const sessionStorageUser = localStorage.getItem('loggedUser');
  const [loggedUser, setLoggedUser] = useState(sessionStorageUser ? JSON.parse(sessionStorageUser).user : null);
  const [toastData, setToastData] = useState({show: false, title: '', body: ''});

  // navigate to appt-list if user is already logged in.
  history.push(!sessionStorageUser ? '/' : '/appt-list');

  // handle post form on login page.
  const attemptLogin = (event, username, password) => {
    event.preventDefault();
    const allowAnonymous = true;
    const data = { username, password };
      HttpPostDispatcher('/api/User/Login', data, LoginResult, (response) => {
          toaster('Login failed!','Username or password may be incorrect.');
    }, allowAnonymous);
  };
  
  // handle result of login request.
  const LoginResult = (response) => {
    if(response.user && response.token){
        localStorage.setItem('loggedUser', JSON.stringify({user:response.user, token:response.token}));

        setLoggedUser(response.user);
        history.push("/appt-list");
    } else {
        toaster('Login failed!','Username or password may be incorrect.')
    }
  };

  // handle dispatching toast messages.
  const toaster = (title, body) => {
    const closeToast = () => {setToastData({...setToastData, show: false})};
    setToastData({
      show: true, 
      title: title, 
      body: body,
      handleClose: closeToast
    });
  }

  // logout - remove sessionStorageItem + navigate to loginPage.
  const logout = () => {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
    history.push('/');
  }

  return (
    <div className="wrapper">
      <TopStrip logout={logout}/>
      <ToastAlert toastData={toastData}/>
      <Container className="main-container">
        <Row className="justify-content-center">
          <Col>
          <Switch>
              <Route exact path='/' component={() => <LoginPage login={attemptLogin} />} />
              <Route path='/signup' component={() => <SignupPage toaster={toaster}/>} />
              <Route path='/appt-list' component={() => <AppointmentList toaster={toaster}/>}/>
              <Route path='/appt-details' component={() => <AppointmentDetails/>} />
              <Route path='/appt-create-edit' component={() => <EditCreateAppointment toaster={toaster}/>} />
              <Route component={() => <GenericNotFound/>}/>
          </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
