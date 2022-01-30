import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileList from '../components/FileList';
import FileUpload from '../components/FileUpload';
import { loadUser } from '../store/actions/auth';
import { loadFiles } from '../store/actions/file';

function File() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.authReducer);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadFiles())
    }, [dispatch]);

    if(auth && !auth.isAuthenticated) {
        navigate("/");
    }
    return (
        <div
        style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}
        >
            <FileUpload />
            <FileList />
        </div>
    );
}

export default File;
