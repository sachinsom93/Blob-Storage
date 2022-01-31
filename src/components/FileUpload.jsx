import React, { useState } from 'react';
import { Header, Form, FormInput, FormButton } from '@fluentui/react-northstar';
import { uploadFile } from '../store/actions/file';
import { useDispatch, useSelector } from 'react-redux';


function FileUpload() {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const fileReducer = useSelector(state => state.fileReducer);

    return (
        <Form
            style={{
                width: "40vw",
                height: "35vh",
                boxShadow: '10px 10px 20px 60px #f8f8f8',
                borderRadius: '10px',
                marginRight: "10vw",
                boxSizing: 'border-box'
            }}
            onSubmit={(e) => dispatch(uploadFile(file))}
        >
            <Header as="h1" content="Upload File"/>
            <FormInput
                label="file"
                name="file"
                id="file-inline"
                inline
                required
                type="file"
                onChange={(e) => setFile(e.target.files)}
            />
            <FormButton content={(fileReducer && fileReducer.isLoading) ? "Uploading..." : "Upload File"} />
        </Form>
    )
}

export default FileUpload;
