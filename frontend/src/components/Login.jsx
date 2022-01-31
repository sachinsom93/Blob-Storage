import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormInput, FormButton, Header } from '@fluentui/react-northstar'
import { login } from '../store/actions/auth';

const Login = () => {

    // dispatcher
    const dispatch = useDispatch();
    const authReducer = useSelector(state => state.authReducer);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Form
            style={{
                width: "30vw",
                height: "50vh",
            }}
            onSubmit={(e) => dispatch(login(email, password))}
        >
            <Header as="h1" content="Login To Account"/>
            <FormInput
                label="Email Address"
                name="email"
                id="email-inline"
                inline
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
                label="Password"
                name="password"
                id="password-inline"
                inline
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <FormButton content={(authReducer && authReducer.isLoading && email && password) ? "Loading..." : "Login"} />
        </Form>
)}

export default Login
