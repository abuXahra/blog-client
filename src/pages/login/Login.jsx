import React, { useContext, useRef, useState } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios';

const Login = () => {

    const userRef = useRef();
    const passwordRef = useRef();


    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/api/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }

    }

    return (
        <div className='login'>
            <div className="loginOverlay">
                <span className="loginTitle">Login</span>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder='Enter your username...'
                        ref={userRef}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="passwrod"
                        placeholder='Enter your password...'
                        ref={passwordRef}
                    />
                    <button type='submit' className='loginSubmit' disabled={isFetching}>Login</button>
                    <button className='registerSubmit'><Link to={'/register'} className='links'>Register</Link></button>
                </form>

            </div>

        </div>
    );
}

export default Login;
