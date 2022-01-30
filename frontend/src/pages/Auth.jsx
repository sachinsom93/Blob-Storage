import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

function Auth() {
  return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Login />
        <SignUp />
      </div>
  );
}

export default Auth;
