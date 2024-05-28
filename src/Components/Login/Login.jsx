import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../../axiosConfig';

// Import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

// Import Assets
import loginImg from '../Assets/studio-Image2.jpg';
import logo from '../Assets/logo.png';

import { useAuth } from '../../AuthContext';

const Login = () => {
    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigateTo = useNavigate();

    // Show message login status
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    const { setIsAuthenticated } = useAuth();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('/login/', {
                username: loginUserName,
                password: loginPassword
            });
            console.log(response);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
                navigateTo('/home');
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                if (error.response.data.message === "credentials don't match") {
                    setLoginStatus("credentials don't match");
                } else {
                    setLoginStatus(error.response.data.message);
                }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    };

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message');
                setLoginStatus('');
            }, 3000);
        }
    }, [loginStatus]);

    const onSubmit = (e) => {
        e.preventDefault();
        loginUser(e);
        setLoginUserName('');
        setLoginPassword('');
    };

    return (
        <div className='loginPage flex'>
            <div className="container flex">
                <div className="videoDiv">
                    <img src={loginImg} alt="Login" />
                    <div className="footerDiv flex">
                        <span className="text">Don't have an account?</span>
                        <Link to={'/register'}>
                            <button className='btn'>Sign Up</button>
                        </Link>
                    </div>
                </div>
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} className='logo' alt="Logo" />
                        <h3>Welcome Back!</h3>
                    </div>
                    <form className="form grid" onSubmit={onSubmit}>
                        <span className={statusHolder}>{loginStatus}</span>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input
                                    type="text"
                                    id='username'
                                    placeholder='Enter Username'
                                    value={loginUserName}
                                    onChange={(event) => {
                                        setLoginUserName(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input
                                    type="password"
                                    id='password'
                                    placeholder='Enter Password'
                                    value={loginPassword}
                                    onChange={(event) => {
                                        setLoginPassword(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>
                        <span className="forgotPassword">
                            Forgot your password? <a href="">Click Here</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;