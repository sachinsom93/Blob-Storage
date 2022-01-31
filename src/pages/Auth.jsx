import React from 'react';
import { useEffect } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '@fluentui/react-northstar';

function Auth() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {dispatch(loadUser())}, [dispatch]);

  if(auth && auth.isAuthenticated) {
    navigate("/file");
  }
  return (
      <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Header as="h1" content="Blob Storage Application" style={{ position: 'fixed', top: '1em', left: '40%'}}/>
        <Login />
        <SignUp />
      </div>
  );
}

export default Auth;
