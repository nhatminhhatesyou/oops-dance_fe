import React, { useState } from 'react';
import { useAuth } from '../../../../AuthContext';
import logo from '../../Assets_HomePage/logo.png';
import avatarPlaceholder from '../../Assets_HomePage/dolinh.png';
import { HiMenu } from "react-icons/hi";

const Navbar = ({ scrollToSection, refs }) => {
    const { user, isAuthenticated, handleLogout } = useAuth();
    console.log("USER DATA:", user)

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
                                    <li className="dropdownItem">My Bookings</li>
                                    <li className="dropdownItem">My Classes</li>
                                    <li className="dropdownItem">My Profile</li>
                                    <li className="dropdownItem">
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
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