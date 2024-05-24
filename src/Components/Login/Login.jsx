import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../../axiosConfig';

// Import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

// Import Assets
import video from '../Assets/login_vid.mov';
import loginImg from '../Assets/studio-Image2.jpg';
import logo from '../Assets/logo.png';
const Login = ({ setAuth }) => {
    // useState Hook
    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigateTo = useNavigate();

    // Show message login status
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    // On click let us get what the user has entered
    const loginUser = async (e) => {
        // Let's prevent submitting
        e.preventDefault();
        // Use Axios to create API that connects to the server
        try {
            const response = await Axios.post('/login/', {
                username: loginUserName,
                password: loginPassword
            });
            console.log(response);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setAuth(true);
                navigateTo('/instructor');
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

    // Clear the form on submit
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
                        {/* LOGIN STATUS */}
                        <span className={statusHolder}>{loginStatus}</span>

                        {/* USERNAME INPUT */}
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

                        {/* PASSWORD INPUT */}
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

                        {/* SUBMIT BUTTON */}
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