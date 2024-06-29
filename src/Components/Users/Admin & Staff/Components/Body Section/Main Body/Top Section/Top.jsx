import { React, useState, useEffect } from 'react'
import './top.css'
import { useNavigate } from 'react-router-dom'
import axios from '../../../../../../../axiosConfig';
import { useAuth } from '../../../../../../../AuthContext';

//Imported icons ================>
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { BsQuestionCircle } from "react-icons/bs";
import { RiNotificationLine } from "react-icons/ri";


//Imported images ================>
import user1 from '../../../../Assets_Admin/user_1.png'

//Imported videos ================>
import video from '../../../../Assets_Admin/video_short.mp4'


const Top = () => {
    const { user } = useAuth();
    const [monthlyBookingCount, setMonthlyBookingCount] = useState("")
    const [totalStudentCount, setTotalStudentCount] = useState("")
    const navigateTo = useNavigate()
    const handleNavigate = (path) => {
        navigateTo(path);
    }

    const fetchBookingCount = async () => {
        try {
            const response = await axios.get(`/monthly-booking-count/`);
            const data = response.data.monthly_booking_count;
            setMonthlyBookingCount(data)
        } catch (error) {
            console.error('Error fetching booking data:', error);
        }
    };
    const fetchStudentCount = async () => {
        try {
            const response = await axios.get(`/total-student-count/`);
            const data = response.data.total_student_count;
            setTotalStudentCount(data)
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    useEffect(() => {
        fetchBookingCount();
        fetchStudentCount();
    }, []);
    return (
        <div className='adminTopSection'>
            <div className="headerSection flex">
                <div className="title">
                    <h1>Welcome to ODS!</h1>
                    <p>Hello Do Linh, Welcome back!</p>
                </div>

                <div className="searchBar flex">
                    <input type="text" placeholder='Search Dashboard' />
                    <BiSearchAlt className='icon' />
                </div>

                <div className="adminDiv flex">
                    <TbMessageCircle className='icon' />
                    <RiNotificationLine className='icon' />
                    <div className="adminImage">
                        <img src={user.avatar_url} />
                    </div>
                </div>

            </div>

            <div className="cardSection flex">

                <div className="rightCard flex">
                    <div className="buttons flex">
                        <button onClick={() => handleNavigate('/admin/attendance-records')} className='btn'>Attendance List</button>
                        <button onClick={() => handleNavigate('/admin/charts')} className='btn transparent'>Top Classes</button>
                    </div>

                    <div className="videoDiv">
                        <video src={video} autoPlay loop muted></video>
                    </div>
                </div>

                <div className="leftCard flex">
                    <div className="main flex">
                        <div className="textDiv">
                            <h1>Studio Stats</h1>

                            <div className="studioStats ">
                                <span className='rooms flex flex-row'>
                                    <div className="title">
                                        <h3>Number of bookings this month:</h3>
                                    </div>
                                    <div className="roomsStatus">
                                        <small> {monthlyBookingCount} </small>
                                    </div>
                                </span>

                                <span className='participants flex'>
                                    <div className="title">
                                        <h3>Number of participants this month:</h3>
                                    </div>
                                    <div className="participantsStatus">
                                        <small>{totalStudentCount} </small>
                                    </div>
                                </span>
                            </div>

                        </div>

                        {/* <div className="imgDiv">
                            <img src={img} />
                        </div> */}
                    </div>
                </div>

                {/* SHHALL USE THIS CARD LATER */}

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



        </div>
    )
}

export default Top