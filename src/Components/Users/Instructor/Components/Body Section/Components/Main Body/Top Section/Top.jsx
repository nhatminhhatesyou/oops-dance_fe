import React, { useEffect, useState } from 'react';
import './top.css'
import { useAuth } from '../../../../../../../../AuthContext';
import axios from '../../../../../../../../axiosConfig';

//Imported icons ================>
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { BsArrowRightShort } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { RiNotificationLine } from "react-icons/ri";


//Imported images ================>
import user1 from '../../../../../Assets_Instructor/user_1.png'
import img from '../../../../../Assets_Instructor/dolinh_rmbg.png'

//Imported videos ================>
import video from '../../../../../Assets_Instructor/video_short.mp4'


const Top = () => {
    const { user } = useAuth()
    const [classCount, setClassCount] = useState(0)
    const [attendanceCount, setAttendanceCount] = useState(0)
    useEffect(() => {
        const fetchClassCount = async () => {
            try {
                const response = await axios.get(`/class_count_by_instructor/${user.id}/`);
                setClassCount(response.data.class_count);
            } catch (error) {
                console.error('Error fetching class count:', error);
            }
        };

        const fetchAttendanceCount = async () => {
            try {
                const response = await axios.get(`/attendance_count_by_instructor/${user.id}/`);
                setAttendanceCount(response.data.attendance_count);
            } catch (error) {
                console.error('Error fetching class count:', error);
            }
        };

        if (user && user.id) {
            fetchClassCount();
            fetchAttendanceCount();
        }

    }, [user]);

    console.log("user data:", user)
    console.log("class count:", classCount)



    return (
        <div className='instructorTopSection'>
            <div className="headerSection flex">
                <div className="title">
                    <h1>Welcome to ODS!</h1>
                    <p>Hello {user.username}, Welcome back!</p>
                </div>

                <div className="searchBar flex">
                    <input type="text" placeholder='Search Dashboard' />
                    <BiSearchAlt className='icon' />
                </div>

                <div className="adminDiv flex">
                    <TbMessageCircle className='icon' />
                    <RiNotificationLine className='icon' />
                    <div className="adminImage">
                        <img src={user1} />
                    </div>
                </div>

            </div>

            <div className="cardSection flex">

                <div className="rightCard flex">
                    {/* <h1>Create extraodinary moments</h1>
                    <p>The world's fast growing industry today are natural made products!</p> */}

                    <div className="buttons flex">
                        <button className='btn'>Explore More</button>
                        <button className='btn transparent'>Top Instructors</button>
                    </div>

                    <div className="videoDiv">
                        <video src={video} autoPlay loop muted></video>
                    </div>
                </div>

                <div className="leftCard flex">
                    <div className="main flex">
                        <div className="textDiv">
                            <h1>My Stat</h1>

                            <div className="flex">
                                <span>
                                    Classes <br /> <small>{classCount}</small>
                                </span>
                                <span>
                                    Participants <br /> <small>waiting...</small>
                                </span>
                                <span>
                                    Attendance session <br /> <small>{attendanceCount}</small>
                                </span>
                            </div>

                            <span className="flex link">
                                Go to my dashboard <BsArrowRightShort className='icon' />
                            </span>



                        </div>

                        <div className="imgDiv">
                            <img src={img} />
                        </div>
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
                        <button className='btn'>Go to help center</button>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default Top