import React from 'react'
import LogoutButton from '../../../../Logout/LogoutButton'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from '@nextui-org/react'
import { useAuth } from '../../../../../AuthContext'
import './sidebar.css'

//Imported Images ===============>
import logo from '../../Assets_Instructor/logo.png'

//Imported Icons ============>
import { IoMdSpeedometer } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlinePieChart } from "react-icons/ai";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";


const SideBar = () => {
    const { user } = useAuth();

    const navigateTo = useNavigate()
    const handleNavigate = (path) => {
        navigateTo(path);
    }
    return (
        <div className='sideBar grid'>

            <div onClick={() => handleNavigate('/home')} className="logoDiv flex justify-center items-center">
                <Image
                    className='min-w-16 md:min-w-20'
                    isBlurred
                    src={logo}
                />
                <h2>Oops! Dance Studio</h2>
            </div>

            <div className="menuDiv">
                <h3 className="divTitle">
                    QUICK MENU
                </h3>

                {user.role === 'instructor' ? (
                    <ul className="menuLists grid">

                        <li className="listItem">
                            <Link to="my-classes" className="menuLink flex">
                                <MdDeliveryDining className='icon' />
                                <span className="smallText">
                                    My Classes
                                </span>
                            </Link>
                        </li>

                        <li className="listItem">
                            <Link to="my-bookings" className="menuLink flex">
                                <MdOutlineExplore className='icon' />
                                <span className="smallText">
                                    My Bookings
                                </span>
                            </Link>
                        </li>

                        <li className="listItem">
                            <Link to="attendance" className="menuLink flex">
                                <IoMdSpeedometer className='icon' />
                                <span className="smallText">
                                    Attendance
                                </span>
                            </Link>
                        </li>
                    </ul>
                ) : user.role === 'guest' ? (
                    <ul className="menuLists grid">

                        <li className="listItem">
                            <Link to="my-classes" className="menuLink flex">
                                <MdDeliveryDining className='icon' />
                                <span className="smallText">
                                    My Classes
                                </span>
                            </Link>
                        </li>

                        <li className="listItem">
                            <Link to="my-bookings" className="menuLink flex">
                                <MdOutlineExplore className='icon' />
                                <span className="smallText">
                                    My Bookings
                                </span>
                            </Link>
                        </li>
                    </ul>
                ) : null}

            </div>

            <div className="settingsDiv">
                <h3 className="divTitle">
                    SETTING
                </h3>
                <ul className="menuLists grid">

                    <li className="listItem">
                        <Link to="chart" className="menuLink flex">
                            <AiOutlinePieChart className='icon' />
                            <span className="smallText">
                                Charts
                            </span>
                        </Link>
                    </li>

                    <li className="listItem">
                        <Link to="my-profile" className="menuLink flex">
                            <MdOutlinePermContactCalendar className='icon' />
                            <span className="smallText">
                                My Profile Setting
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>


            <div className="logOutBtn flex">
                <LogoutButton />
            </div>


            <div className="sideBarCard">
                <BsQuestionCircle className='icon' />

                <div className="cardContent">
                    <div className="circle1"></div>
                    <div className="circle2"></div>

                    <h3>Help Center</h3>
                    <p>Having any trouble in Oops! Dance Studio, please contact us.</p>
                    <button className='btn'>Contact</button>
                </div>
            </div>

        </div>
    )
}

export default SideBar