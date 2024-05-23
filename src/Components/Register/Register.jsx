import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../../axiosConfig'

//Import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

//Import Assets ===========>
import video from '../Assets/login_vid.mov'
import logo from '../Assets/logo.png'


const Register = () => {
    //useState to hold inputs
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [registerStatus, setRegisterStatus] = useState('');

    const navigateTo = useNavigate()

    //onclick let us get what the user has entered
    const createUser = async (e) => {
        e.preventDefault();
        //Use Axios to create API that connects to the server
        // Axios.post('http://127.0.0.1:8000/register/', {
        //     //create variables to send to the server through route
        //     email: email,
        //     username: userName,
        //     password: password
        // }).then(() => {
        //     console.log('User has been created')
        //     navigateTo('/login')
        //     setEmail('')
        //     setUserName('')
        //     setPassword('')
        // })

        try {
            const response = await Axios.post('/register/', {
                email: email,
                username: userName,
                password: password
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setAuth(true);
                navigateTo('/instructor');
            }
        } catch (error) {
            console.log(error.response.data);
            setRegisterStatus('Failed to register');
        }
    }


    return (
        <div className='registerPage flex'>
            <div className="container flex">

                <div className="videoDiv">

                    <video src={video} autoPlay muted loop></video>
                    {/* <div className="textDiv">
                        <h2 className="title">A Place Where You Shine</h2>
                        <p>Adopt the peace of nature!</p>
                    </div> */}

                    <div className="footerDiv flex">
                        <span className="text">Already have an account?</span>
                        <Link to={'/login'}>
                            <button className='btn'>Log In</button>
                        </Link>
                    </div>

                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} className='logo' />
                        <h3>Welcome Back!</h3>
                    </div>

                    <form action="" className="form grid">

                        {/* INPUT EMAIL */}
                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className='icon' />
                                <input type="text" id='email' placeholder='Enter Email' onChange={(event) => {
                                    setEmail(event.target.value)
                                }} />
                            </div>
                        </div>

                        {/* INPUT USERNAME */}
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="text" id='username' placeholder='Enter Username' onChange={(event) => {
                                    setUserName(event.target.value)
                                }} />
                            </div>
                        </div>

                        {/* INPUT PASSWORD */}
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input type="password" id='password' placeholder='Enter Password' onChange={(event) => {
                                    setPassword(event.target.value)
                                }} />
                            </div>
                        </div>


                        {/* SUBMIT BUTTON */}
                        <button type='submit' className='btn flex' onClick={createUser}>
                            <span>Register </span>
                            <AiOutlineSwapRight className='icon' />
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <a href="">Click Here</a>
                        </span>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register 