import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './sidebar.css'

//Imported Images ===============>
import logo from '../../Assets_Admin/logo.png'

//Imported Icons ============>
import { IoMdSpeedometer } from "react-icons/io";
import { FaDoorClosed } from "react-icons/fa6";
import { AiOutlinePieChart } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { FaDoorOpen } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa6";
import { SiBytedance } from "react-icons/si";
import LogoutButton from '../../../../Logout/LogoutButton';


const SideBar = () => {
    const navigateTo = useNavigate()
    const handleNavigate = (path) => {
        navigateTo(path);
    }

    return (
        <div className='sideBar grid'>

            <div onClick={() => handleNavigate('/admin')} className="logoDiv flex">
                <img src={logo} />
                <h2>Oops! Dance Studio</h2>

            </div>

            <div className="menuDiv">
                <h3 className="divTitle">
                    QUICK MENU
                </h3>
                <ul className="menuLists grid">

                    <li className="listItem">
                        <Link to="/admin/dashboard" className="menuLink flex">
                            <IoMdSpeedometer className='icon' />
                            <span className="smallText">
                                Dash Board
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
                                Classes
                            </span>
                        </Link>
                    </li>
                    <li className="listItem">
                        <Link to="/admin/users" className="menuLink flex">
                            <FaUserGroup className='icon' />
                            <span className="smallText">
                                Users
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
                        <Link to="#" className="menuLink flex">
                            <AiOutlinePieChart className='icon' />
                            <span className="smallText">
                                Charts
                            </span>
                        </Link>
                    </li>

                    <li className="listItem">
                        <Link to="#" className="menuLink flex">
                            <BiTrendingUp className='icon' />
                            <span className="smallText">
                                Trends
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
                            <BsCreditCard2Front className='icon' />
                            <span className="smallText">
                                Billing
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
                    <button className='btn'>Go to help center</button>
                </div>
            </div>

        </div>
    )
}

export default SideBar