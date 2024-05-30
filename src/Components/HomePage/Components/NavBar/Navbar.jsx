import React, { useState } from 'react';
import { useAuth } from '../../../../AuthContext';
import logo from '../../Assets_HomePage/logo.png';
import { HiMenu } from "react-icons/hi";
import { Link } from 'react-router-dom'

import avatarPlaceholder from '../../Assets_HomePage/avatar.png';


//IMPORTED ICONS ============================>
import { FaRegUser } from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { FaDoorOpen } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";




const Navbar = ({ scrollToSection, refs }) => {
    const { user, isAuthenticated, handleLogout } = useAuth();
    console.log("user data at home page:", user)
    const [active, setActive] = useState('navBarMenu');
    const showNavBar = () => {
        setActive('navBarMenu showNavBar');
    };
    const removeNavBar = () => {
        setActive('navBarMenu');
    };

    const [noBg, addBg] = useState('navBarTwo');
    const addBgColor = () => {
        if (window.scrollY >= 10) {
            addBg('navBarTwo navbar_With_Bg');
        } else {
            addBg('navBarTwo');
        }
    };
    window.addEventListener('scroll', addBgColor);

    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className='navBar flex'>
            <div className={noBg}>
                <div className="logoDiv">
                    <img src={logo} className='logo' />
                    <div className={active}>
                        <ul className="menu flex">
                            <li onClick={() => { removeNavBar(); scrollToSection(refs.homeRef); }} className="listItem">Home</li>
                            <li onClick={() => { removeNavBar(); scrollToSection(refs.aboutRef); }} className="listItem">About</li>
                            <li onClick={() => { removeNavBar(); scrollToSection(refs.offersRef); }} className="listItem">Offers</li>
                            <li onClick={() => { removeNavBar(); scrollToSection(refs.roomsRef); }} className="listItem">Room</li>
                            <li onClick={() => { removeNavBar(); scrollToSection(refs.classesRef); }} className="listItem">Classes</li>
                            <button onClick={removeNavBar} className='btn flex btnOne'>
                                Contact
                            </button>
                        </ul>
                    </div>

                    <div onClick={showNavBar} className='toggleIcon'>
                        <HiMenu className='icon' />
                    </div>
                </div>

                <div className="atb flex">
                    {isAuthenticated ? (
                        <div className="avatarContainer">
                            <img
                                src={user?.avatarUrl || avatarPlaceholder}
                                alt="User Avatar"
                                className="avatar"
                                onClick={toggleDropdown}
                            />
                            {showDropdown && (
                                <ul className="dropdownMenu">
                                    <div className="subMenu flex">
                                        <div className="userInfo">
                                            <img src={user?.avatarUrl || avatarPlaceholder} />
                                            <h3>Welcome, {user.username}!</h3>
                                        </div>
                                        <hr />
                                        <li className="dropdownItem">
                                            <div className='iconDiv'>

                                                <FaRegUser className='icon' />
                                            </div>
                                            <Link to="/instructor" className='link'>
                                                <h3>
                                                    My Profile
                                                </h3>
                                                <FaLongArrowAltRight />
                                            </Link>
                                        </li>
                                        <li className="dropdownItem">
                                            <div className='iconDiv'>
                                                <MdFactCheck className='icon' />
                                            </div>
                                            <Link to="/instructor/my-bookings" className='link'>
                                                <h3>
                                                    My Bookings
                                                </h3>
                                                <FaLongArrowAltRight />

                                            </Link>
                                        </li>
                                        <li className="dropdownItem">
                                            <div className='iconDiv'>
                                                <FaDoorOpen className='icon' />
                                            </div>
                                            <Link to="/instructor/my-classes" className='link'>
                                                <h3>
                                                    My Classes
                                                </h3>
                                                <FaLongArrowAltRight />

                                            </Link>
                                        </li>
                                        <li className="dropdownItem">
                                            <div className='iconDiv'>
                                                <FaRegCalendarCheck className='icon' />
                                            </div>
                                            <Link to="/instructor/attendance" className='link'>
                                                <h3>
                                                    Attendance
                                                </h3>
                                                <FaLongArrowAltRight />

                                            </Link>
                                        </li>
                                        <li className="dropdownItem">
                                            <div className='iconDiv'>
                                                <FiSettings className='icon' />
                                            </div>
                                            <Link to="/" className='link'>
                                                <h3>
                                                    Setting
                                                </h3>
                                                <FaLongArrowAltRight />

                                            </Link>
                                        </li>
                                        <li className="dropdownItem button">
                                            <button className='btn' onClick={handleLogout}>Logout</button>
                                        </li>
                                    </div>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <>
                            <a href="/register">
                                <span>Sign Up</span>
                            </a>
                            <a href="/login">
                                <span>Sign In</span>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;