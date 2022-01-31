import React, { useState } from 'react';
import { Header, Form, FormInput, FormButton } from '@fluentui/react-northstar';
import { uploadFile } from '../store/actions/file';
import { useDispatch } from 'react-redux';
function FileUpload() {

    const [file, setFile] = useState(null)
    const dispatch = useDispatch()

    return (
        <Form
            style={{
                width: "50vw",
                height: "35vh",
                boxShadow: '10px 10px 50px 60px #f8f8f8',
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
            <FormButton content="Upload File" />
        </Form>
    )
}

export default FileUpload;
