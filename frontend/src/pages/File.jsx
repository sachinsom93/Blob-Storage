import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../store/actions/auth';

function File() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.authReducer);
    const navigate = useNavigate();

    useEffect(() => {dispatch(loadUser())}, [dispatch]);

    if(auth && !auth.isAuthenticated) {
        navigate("/");
    }
    return (
        <div
        style={{
            width: '100vw',
            height: '100vh'
        }}
        >
            <h1>Welcome</h1>
        </div>
    );
}

export default File;
