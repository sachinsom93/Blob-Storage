import { Button } from '@fluentui/react-northstar';
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
            alignItems: 'center',
        }}
        >
            <Button
                content="Logout"
                style={{ position: 'fixed', left: '1em', top: '4em'}}
                onClick={() => {
                    localStorage.removeItem("blob_token");
                    window.location.reload();
                }}
            />
            <h2
                style={{ position: 'fixed', left: '1em', top: '4.5em'}}
            >Welcome, {auth && auth.user && auth.user.email}!</h2>
            <div
                style={{
                    width: '60vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <FileUpload />
            </div>
            <div
                style={{
                    width: '40vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: '0'
                }}
            >
                <FileList />
            </div>
        </div>
    );
}

export default File;
