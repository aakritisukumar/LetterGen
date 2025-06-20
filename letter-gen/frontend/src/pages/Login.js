// src/pages/Login.js

import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import email_icon from '../Assets/letter.png';
import password_icon from '../Assets/heart-lock.png';
import React, { useState } from 'react';
import { handleSuccess, handleError } from '../utils';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

    const [LoginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
            const { name, value } = e.target;
            console.log(name, value);
            const copyLoginInfo = { ...LoginInfo };
            copyLoginInfo[name] = value;
            setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password } = LoginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `http://localhost:5000/api/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            });
            const result = await response.json();
            console.log('🔍 Login API result:', result);

            const { success, message, jwtToken, name, error } = result;
            console.log('Fields:', { success, message, jwtToken, name, error });
            
            if (success && jwtToken) {
                handleSuccess(message || 'Login successful!');
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000)
            } else if (error) {
            const details = error?.details?.[0]?.message || error;
            handleError(details);
        } else {
            handleError(message || 'Login failed');
        }
    } catch (err) {
        handleError(err.message);
    }
}

    return (
        <div className="signup-container">
    
        <div className="form-box">
            <h1>Login </h1>
            <form onSubmit={handleLogin}>

                <div className="inputs">
                    <label htmlFor='email'>Email</label>
                    <div className="input-icon">
                    <img src={email_icon} alt="" />
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={LoginInfo.email}
                    />
                    </div>
                </div>
                <div className="inputs">
                    <label htmlFor='password'>Password</label>
                    <div className="input-icon">
                    <img src={password_icon} alt="" />
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={LoginInfo.password}
                    />
                    </div>
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account? <Link to="/signup">Signup</Link></span>
            </form>
        </div>
        
        <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>

        </div>
    );
}

export default Login;
