import React, { useState } from 'react';
import { Header, Form, FormInput, FormButton } from '@fluentui/react-northstar';
// import { useDispatch } from 'react-redux';


function FileShare() {
    const [email, setEmail] = useState(null)
    const [fileName, setFileName] = useState(null)
    // const dispatch = useDispatch()

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
            onSubmit={(e) => console.log(email, fileName)}
        >
            <Header as="h1" content="Share With Others"/>
            <FormInput
                label="Email"
                name="email"
                id="email-inline-share"
                inline
                required
                type="email"
                onChange={(e) => setEmail(e.target.files)}
            />
            <FormInput
                label="File Name"
                name="fileName"
                id="filename-inline-share"
                inline
                required
                type="text"
                onChange={(e) => setFileName(e.target.files)}
            />
            <FormButton content="Share File" />
        </Form>
    )
}

export default FileShare;
