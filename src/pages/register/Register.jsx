import React, { useState } from 'react';
import './Register.css'
import { Link } from 'react-router-dom';
import axios from 'axios'


const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [erroMessage, setErroMessage] = useState('Something went wrong')
    const [success, setSuccess] = useState(false)
    const successMessage = "Registered Successfully";

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(false)


        // if (username === null || username === "") {
        //     setErroMessage("username is rquired")
        // } else if (email === "" || email === null) {
        //     setErroMessage("email is rquired")
        // } else if (password === "" || password === null) {
        //     setErroMessage("password is rquired")
        // }
        // else {
        //     setErroMessage("something went wrong")

        // }

        try {

            const res = await axios.post('/api/auth/register', {
                username,
                email,
                password
            });
            setSuccess(true);
            res.data && window.location.replace('/login')

            setEmail("")
            setUsername("")
            setPassword("")

        } catch (err) {
            setError(true)
        }

    }

    const nameHandler = (e) => {
        setUsername(e.target.value)
        setError(false);
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        setError(false);
    }


    const passwordHandler = (e) => {
        setPassword(e.target.value)
        setError(false);
    }

    return (
        <div className='register'>
            <div className="registerOverlay">
                <span className="registerTitle">Register</span>
                <form className='registerForm' onSubmit={submitHandler}>
                    <label htmlFor="name">Name {username}</label>
                    <input
                        type="text"
                        placeholder='Enter your name...'
                        onChange={nameHandler}
                        value={username}
                    />
                    <label htmlFor="Email">Email {email}</label>
                    <input
                        type="email"
                        placeholder='Enter your email...'
                        onChange={emailHandler}
                        value={email} />
                    <label htmlFor="password">Password {password}</label>
                    <input
                        type="passwrod"
                        placeholder='Enter your password...'
                        onChange={passwordHandler}
                        value={password}
                    />
                    <button className='registersSubmit' type='submit'> Register </button>
                    {error && <span style={{ color: "yellow", marginTop: "10px" }}>{erroMessage}</span>}
                    {success && <span style={{ color: "white", marginTop: "10px" }}>{successMessage}</span>}
                    <button className='loginsSubmit'><Link to={'/login'} className='links'>Login</Link></button>
                </form>

            </div>

        </div>
    );
}

export default Register;
