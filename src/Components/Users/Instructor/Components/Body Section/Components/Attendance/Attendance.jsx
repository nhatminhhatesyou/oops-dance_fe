import React, { useEffect, useState } from 'react';
import './attendance.css'
import { useAuth } from '../../../../../../../AuthContext'
import axios from '../../../../../../../axiosConfig'

//Imported images ==================>
import logo from '../../../../Assets_Instructor/logo2.png'
import class_1 from '../../../../Assets_Instructor/dolinh_class_1.jpeg'
import class_2 from '../../../../Assets_Instructor/dolinh_class_2.jpg'

//Imported icons ==================>
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const Attendance = () => {
    const { user } = useAuth();
    const [todayClasses_All, setTodayClasses_All] = useState([]);
    const [todayClasses_Instructor, setTodayClasses_Instructor] = useState([]);

    useEffect(() => {
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

        fetchTodayClasses();
    }, [user]);

    console.log("ALL CLASSES TODAY: ", todayClasses_All)
    console.log("INSTRUCTOR'S CLASSES TODAY: ", todayClasses_Instructor)

    const getTodaySchedule = (schedules) => {
        const todayDayOfWeek = (new Date().getDay() - 1).toString();
        const todaySchedule = schedules.find(schedule => schedule.day_of_the_week === todayDayOfWeek);
        return `${todaySchedule.start_time} - ${todaySchedule.end_time}`;
    };

    return (
        <div className='attendance'>
            <div className="historyDiv sectionContainer ">
                <div className="heading">
                    <h1>Your Attendance History</h1>
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
                                        <div className="classImg">
                                            <img src={classItem.image || logo} alt="" />
                                        </div>

                                        <div className="cardText">
                                            <span>
                                                {classItem.class_name} <br />
                                                {getTodaySchedule(classItem.schedules)}
                                            </span>
                                        </div>

                                        <button className="btn">Check In Now</button>
                                    </div>
                                ))
                            ) : (
                                <h1>No class for today</h1>
                            )}
                        </div>
                    </div>
                </div>

                {/* ALL TODAY-CLASSES */}
                <div className="singleItem flex cards">
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
                                                {classItem.class_name} <br />
                                                {getTodaySchedule(classItem.schedules)}
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
                </div>



            </div>
        </div>
    )
}

export default Attendance