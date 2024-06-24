import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from '@nextui-org/react'

import './sidebar.css'

//Imported Images ===============>
import logo from '../../Assets_Admin/logo.png'

//Imported Icons ============>
import { MdDashboard } from "react-icons/md";
import { FaDoorClosed } from "react-icons/fa6";
import { AiOutlinePieChart } from "react-icons/ai";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { FaDoorOpen } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa6";
import { SiBytedance } from "react-icons/si";
import { FaCalendarCheck } from "react-icons/fa";
import LogoutButton from '../../../../Logout/LogoutButton';


const SideBar = () => {
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
                <ul className="menuLists grid">

                    <li className="listItem">
                        <Link to="/admin/" className="menuLink flex">
                            <MdDashboard className='icon' />
                            <span className="smallText">
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li className="listItem">
                        <Link to="/admin/rooms" className="menuLink flex">
                            <FaDoorOpen className='icon' />
                            <span className="smallText">
                                Rooms
                            </span>
                        </Link>
                    </li>

                    <li className="listItem">
                        <Link to="/admin/bookings" className="menuLink flex">
                            <FaDoorClosed className='icon' />
                            <span className="smallText">
                                Bookings
                            </span>
                        </Link>
                    </li>

                    <li className="listItem">
                        <Link to="/admin/classes" className="menuLink flex">
                            <SiBytedance className='icon' />
                            <span className="smallText">
                                Classes & Schedules
                            </span>
                        </Link>
                    </li>
                    <li className="listItem">
                        <Link to="/admin/students" className="menuLink flex">
                            <SiBytedance className='icon' />
                            <span className="smallText">
                                Dance Students
                            </span>
                        </Link>
                    </li>
                    <li className="listItem">
                        <Link to="/admin/attendance-records" className="menuLink flex">
                            <FaCalendarCheck className='icon' />
                            <span className="smallText">
                                Attendance Records
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="settingsDiv">
                <h3 className="divTitle">
                    SETTING
                </h3>
                <ul className="menuLists grid">
                    <li className="listItem">
                        <Link to="/admin/users" className="menuLink flex">
                            <FaUserGroup className='icon' />
                            <span className="smallText">
                                Users
                            </span>
                        </Link>
                    </li>

                    <li className="listItem">
                        <Link to="#" className="menuLink flex">
                            <AiOutlinePieChart className='icon' />
                            <span className="smallText">
                                Charts
                            </span>
                        </Link>
                    </li>

                    <li className="listItem">
                        <Link to="#" className="menuLink flex">
                            <MdOutlinePermContactCalendar className='icon' />
                            <span className="smallText">
                                Contacts
                            </span>
                        </Link>
                    </li>

                    <li className="listItem">
                        <Link to="#" className="menuLink flex">
                            <FaHouseUser className='icon' />
                            <span className="smallText">
                                Home Page Setting
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