import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormInput, FormButton, Header } from '@fluentui/react-northstar';
import { signUp } from '../store/actions/auth';

const SignUp = () => {


    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // Dispatcher
    const dispatch = useDispatch();
    const authReducer = useSelector(state => state.authReducer);


    return (
        <Form
            style={{
                width: "30vw",
                height: "50vh",
            }}
            onSubmit={(e) => dispatch(signUp(name, email, password))}
        >
            <Header as="h1" content="Create New Account"/>
            <FormInput label="Full name" name="fullName" id="fullName-inline-signup" inline required onChange={e => setName(e.target.value)}/>
            <FormInput label="Email Address" name="email" id="email-inline-signup" inline required   onChange={e => setEmail(e.target.value)}/>
            <FormInput label="Password" name="password" id="password-inline-signup" inline required type="password" onChange={e => setPassword(e.target.value)}/>
            <FormButton content={(authReducer && authReducer.isLoading && name && email && password) ? "Loading..." : "Create Account"} />

        </Form>
    )
}

export default SignUp
