import React, { useState } from 'react';

//Import icons
import { SiConsul } from 'react-icons/si';
import { BsPhoneVibrate } from 'react-icons/bs';
import { AiOutlineGlobal } from 'react-icons/ai';
import { HiMenu } from "react-icons/hi";
import { CgMenuGridO } from 'react-icons/cg';

//import images
import logo from '../../Assets_HomePage/logo.png';
import LogoutButton from '../../../Logout/LogoutButton';

const Navbar = ({ scrollToSection, refs }) => {
    //Remove the Navbar in the small width screens ================>
    const [active, setActive] = useState('navBarMenu');
    const showNavBar = () => {
        setActive('navBarMenu showNavBar');
    };
    const removeNavBar = () => {
        setActive('navBarMenu');
    };

    //Add a background color to the second Navbar ==============>
    const [noBg, addBg] = useState('navBarTwo');
    const addBgColor = () => {
        if (window.scrollY >= 10) {
            addBg('navBarTwo navbar_With_Bg');
        } else {
            addBg('navBarTwo');
        }
    };
    window.addEventListener('scroll', addBgColor);

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
                    <a href="/register">
                        <span>Sign Up</span>
                    </a>
                    <a href="/login">
                        <span>Sign In</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
