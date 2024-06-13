import React, { useEffect, useState } from 'react';
import './attendance.css'
import { useAuth } from '../../../../../../../AuthContext'
import axios from '../../../../../../../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'

//Imported images ==================>
import logo from '../../../../Assets_Instructor/logo2.png'
import class_1 from '../../../../Assets_Instructor/dolinh_class_1.jpeg'
import class_2 from '../../../../Assets_Instructor/dolinh_class_2.jpg'

//Imported icons ==================>
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";


const Attendance = () => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    const { user } = useAuth();
    const [todayClasses_All, setTodayClasses_All] = useState([]);
    const [todayClasses_Instructor, setTodayClasses_Instructor] = useState([]);

    const fetchTodayClasses = async () => {
        try {
            const response1 = await axios.get(`/classes_today/`);
            setTodayClasses_All(response1.data);
            const response2 = await axios.get(`/classes_today/${user.id}/`);
            setTodayClasses_Instructor(response2.data);
        } catch (error) {
            console.error('Error fetching today\'s classes:', error);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchTodayClasses();
        }
    }, [user]);

    const getTodaySchedule = (schedules) => {
        let todayDayOfWeek = (new Date().getDay() - 1);
        if (todayDayOfWeek < 0) {
            todayDayOfWeek = todayDayOfWeek + 7
        }

        const todaySchedule = schedules.find(schedule => schedule.day_of_the_week === todayDayOfWeek.toString());
        return `${todaySchedule?.start_time} - ${todaySchedule?.end_time}`;
    };

    //FETCH ATTENDANCE RECORD BY INSTRUCTOR
    const [attendanceList, setAttendanceList] = useState([])

    const fetchAttendanceList = async () => {
        try {
            const response = await axios.get(`/attendance-list/${user.id}`);
            setAttendanceList(response.data)
            console.log("attendance list:", attendanceList)
        } catch (error) {
            console.error('Error fetching attendance records:', error)
        }
    }
    useEffect(() => {
        if (user && user.id) {
            fetchAttendanceList();
        }
    }, [user]);


    //CHECKIN FORM =======>
    const [activeForm1, setActiveForm1] = useState('formDiv flex')
    const [blur, setBlur] = useState('blurLayer')
    const [className, setClassName] = useState('')
    const [roomID, setRoomID] = useState('')
    const [attendanceID, setAttendanceID] = useState('')

    const showForm1 = (classData) => {
        setClassName(classData.class_instance_detail.class_name)
        setRoomID(classData.room_id)
        setAttendanceID(classData.id)
        setActiveForm1('formDiv flex showForm')
        setBlur('blurLayer showLayer')
    }
    const removeForm1 = () => {
        setActiveForm1('formDiv flex')
        setBlur('blurLayer')
    }

    //checkin status
    const [checkInStatus, setcheckInStatus] = useState('')
    const [statusHolder, setStatusHolder] = useState('message')


    useEffect(() => {
        if (checkInStatus !== '') {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message')
                setcheckInStatus('')
            }, 3000);
        }
    }, [checkInStatus])

    //handle CHECK-IN
    const handleCheckIn = (e) => {
        e.preventDefault();
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        axios.patch(`/attendance/${attendanceID}/`, {
            checkin_time: formattedTime,
            status: "in_progress"
        }).then((response) => {
            alert("Checkin Success!");
            fetchAttendanceList();
            fetchTodayClasses();
            removeForm1();
        })
            .catch((error) => {
                console.error("Error: ", error);
                alert("ERROR");
            });

    }
    //CHECKOUT FORM =======>
    const [activeForm2, setActiveForm2] = useState('formDiv flex')

    const showForm2 = (classData) => {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        setClassName(classData.class_instance_detail.class_name)
        setRoomID(classData.room_id)
        setAttendanceID(classData.id)
        setActiveForm2('formDiv flex showForm')
        setBlur('blurLayer showLayer')
    }
    const removeForm2 = () => {
        setActiveForm2('formDiv flex')
        setBlur('blurLayer')
    }

    useEffect(() => {
        if (checkInStatus !== '') {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message')
                setcheckInStatus('')
            }, 3000);
        }
    }, [checkInStatus])

    //handle CHECK-OUT
    const handleCheckOut = (e) => {
        e.preventDefault();
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        axios.patch(`/attendance/${attendanceID}/`, {
            checkout_time: formattedTime,
            status: "waiting"
        }).then((response) => {
            alert("Checkout Success!");
            fetchAttendanceList();
            fetchTodayClasses();
            removeForm2();
        })
            .catch((error) => {
                console.error("Error: ", error);
                alert("ERROR");
            });

    }

    console.log("today class:", todayClasses_Instructor)


    return (
        <div className='attendance '>
            <div className="historyDiv sectionContainer">
                <div className="heading">
                    <h1>Your Attendance Records</h1>
                </div>
                <div className='tableDiv flex'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Class Name</th>
                                <th>Date</th>
                                <th>Checkin Time</th>
                                <th>Checkout Time</th>
                                <th>Instructor ID</th>
                                <th>Instructor name</th>
                                <th>Room ID</th>
                                <th>Proof</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceList.map((attendanceItem) => (
                                <tr key={attendanceItem.id}>
                                    <td>{attendanceItem.id}</td>
                                    <td>{attendanceItem.class_instance_detail.class_name}</td>
                                    <td>{attendanceItem.date}</td>
                                    <td>{attendanceItem.checkin_time}</td>
                                    <td>{attendanceItem.checkout_time}</td>
                                    <td>{attendanceItem.instructor_id}</td>
                                    <td>{attendanceItem.instructor_detail.username}</td>
                                    <td>{attendanceItem.room_id}</td>
                                    <td>{attendanceItem.proof}</td>
                                    <td>{attendanceItem.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="todayClassesDiv sectionContainer flex">
                <div className="heading">
                    <h1>Classes Today</h1>
                </div>

                {/* INSTRUCTOR'S TODAY-CLASSES */}
                <div className="singleItem flex cards">
                    <div className="heading1">
                        <h1>Your Classes Today</h1>
                    </div>

                    <div className="cards todaySchedule flex">
                        <div className="schedule">
                            {todayClasses_Instructor.length > 0 ? (
                                todayClasses_Instructor.map((classItem) => (

                                    <div key={classItem.id} className="singleCard flex">
                                        <Link to="/instructor/my-classes" className="classImg">
                                            <img src={`${cloudinaryBaseUrl}/${classItem.class_instance_detail.image}` || logo} alt="" />
                                        </Link>

                                        <div className="cardText">
                                            <span>
                                                {classItem.class_instance_detail.class_name} <br />
                                                {getTodaySchedule(classItem.class_instance_detail.schedules)}
                                            </span>
                                        </div>

                                        {classItem.status === "pending" ? (
                                            <button className="btn" onClick={() => showForm1(classItem)}>Check In Now</button>
                                        ) : classItem.status === "in_progress" ? (
                                            <button className="btn" onClick={() => showForm2(classItem)}>Check Out Now</button>
                                        ) : <button className="btn" >Completed</button>}
                                    </div>
                                ))
                            ) : (
                                <h2>No class for today</h2>
                            )}
                        </div>
                    </div>
                </div>

                {/* ALL TODAY-CLASSES */}
                {/* <div className="singleItem flex cards">
                    <div className="heading1">
                        <h1>All Classes Today</h1>
                    </div>

                    <div className="cards todaySchedule flex">
                        <div className="schedule">
                            {todayClasses_All.length > 0 ? (
                                todayClasses_All.map((classItem) => (
                                    <div key={classItem.id} className="singleCard flex">
                                        <div className="classImg">
                                            <img src={classItem.image || logo} alt="" />
                                        </div>

                                        <div className="cardText">
                                            <span>
                                                {classItem.class_instance_detail.class_name} <br />
                                                {getTodaySchedule(classItem.class_instance_detail.schedules)}
                                            </span>
                                        </div>

                                        <button className="btn">Check In Now</button>
                                    </div>
                                ))
                            ) : (
                                <h2>No class for today</h2>
                            )}
                        </div>
                    </div>
                </div> */}

                <div className="reportDiv cards flex">
                    <h2>Anything's wrong? Send a report</h2>
                    <button className='btn'>Make a report</button>
                </div>

            </div>

            <div className="checkinDiv">
                {/* CHECKIN FORM */}
                <div className={activeForm1}>
                    <form action="" className="form grid" >
                        <IoIosCloseCircle className='icon' onClick={removeForm1} />
                        <h3>Check In</h3>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <p>Class Name: {className}</p>
                        </div>


                        {/*  INPUT */}
                        <div className="inputDiv">
                            <p>Instructor: {user.username}</p>
                        </div>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <p>Room: {roomID}</p>
                        </div>


                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="price">Upload Proof</label>
                            <div className="input flex">
                                <input type="file" id='proof' placeholder='Enter' onChange={(event) => {
                                }} />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button type='submit' className='btn' onClick={handleCheckIn}>
                            <span>Check In</span>
                        </button>
                    </form>
                </div>

                {/* CHECKOUT FORM */}
                <div className={activeForm2}>
                    <form action="" className="form grid" >
                        <IoIosCloseCircle className='icon' onClick={removeForm2} />
                        <h3>Check Out</h3>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <p>Class Name: {className}</p>
                        </div>


                        {/*  INPUT */}
                        <div className="inputDiv">
                            <p>Instructor: {user.username}</p>
                        </div>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <p>Room: {roomID}</p>
                        </div>


                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="price">Upload Proof</label>
                            <div className="input flex">
                                <input type="text" id='proof' placeholder='Enter' onChange={(event) => {
                                }} />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button type='submit' className='btn' onClick={handleCheckOut}>
                            <span>Check Out</span>
                        </button>
                    </form>
                </div>
            </div>

            <div className={blur}></div>
        </div>
    )
}

export default Attendance