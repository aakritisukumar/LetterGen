// src/pages/Signup.js
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import user_icon from '../Assets/woman.png';
import email_icon from '../Assets/letter.png';
import password_icon from '../Assets/heart-lock.png';
import React, { useState } from 'react';
import { handleSuccess, handleError } from '../utils';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
            const { name, value } = e.target;
            console.log(name, value);
            const copySignupInfo = { ...signupInfo };
            copySignupInfo[name] = value;
            setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `https://lettergen-8agl.onrender.com/api/auth/register`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success || message === "User registered successfully") {
                handleSuccess(message);
                setTimeout(() => {
                    console.log('Redirecting to login...');
                    navigate('/login');
                }, 2000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className="signup-container">
    
        <div className="form-box">
            <h1>Sign In</h1>
            <form onSubmit={handleSignup}>

            <div className="inputs">
                    <label htmlFor='name'>Name</label>
                    <div className="input-icon">
                    <img src={user_icon} alt="" />
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                    </div>
                </div>
                <div className="inputs">
                    <label htmlFor='email'>Email</label>
                    <div className="input-icon">
                    <img src={email_icon} alt="" />
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
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
                        value={signupInfo.password}
                    />
                    </div>
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
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

export default Signup;
