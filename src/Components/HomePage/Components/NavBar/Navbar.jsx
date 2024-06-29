import React, { useState } from 'react';
import { useAuth } from '../../../../AuthContext';
import logo from '../../Assets_HomePage/logo.png';
import { HiMenu } from "react-icons/hi";
import { useDisclosure } from "@nextui-org/react";

//IMPORTED ICONS ============================>
import AvatarUser from './AvatarUser';
import ContactModal from './ContactModal';

const Navbar = ({ scrollToSection, refs }) => {
    const { isOpen: isContactOpen, onOpen: onContactOpen, onOpenChange: onContactOpenChange } = useDisclosure();

    const { user, isAuthenticated, handleLogout } = useAuth();
    const [active, setActive] = useState('navBarMenu');

    const contactHandler = () => {
        removeNavBar();
        onContactOpen();
    }

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

    return (
        <div className='navBar flex items-center'>
            <div className={noBg}>
                <div className="logoDiv">
                    <img src={logo} className='logo' />
                    <div className={active}>
                        <ul className="menu flex items-center">
                            <li onClick={() => { removeNavBar(); scrollToSection(refs.homeRef); }} className="listItem">Home</li>
                            <li onClick={() => { removeNavBar(); scrollToSection(refs.aboutRef); }} className="listItem">About</li>
                            <li onClick={() => { removeNavBar(); scrollToSection(refs.roomsRef); }} className="listItem">Room</li>
                            <li onClick={() => { removeNavBar(); scrollToSection(refs.classesRef); }} className="listItem">Classes</li>
                            <button onClick={contactHandler} className='btn flex btnOne'>
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

                        <AvatarUser />
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

            <ContactModal
                isOpen={isContactOpen}
                onOpenChange={onContactOpenChange}
            />
        </div>
    );
};

export default Navbar;