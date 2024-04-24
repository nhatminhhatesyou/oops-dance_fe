import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

//Import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

//Import Assets ===========>
import video from '../../assets/login_vid.mov'
import logo from '../../assets/logo.png'


const Register = () => {
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

                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className='icon' />
                                <input type="text" id='email' placeholder='Enter Email' />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input type="password" id='password' placeholder='Enter Password' />
                            </div>
                        </div>

                        <button type='submit' className='btn flex'>
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