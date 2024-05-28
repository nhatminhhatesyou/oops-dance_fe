import React from 'react'
import './attendance.css'

//Imported images ==================>
import class_1 from '../../../../Assets_Instructor/dolinh_class_1.jpeg'
import class_2 from '../../../../Assets_Instructor/dolinh_class_2.jpg'

//Imported icons ==================>
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const Attendance = () => {
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

                <div className="singleItem flex cards">
                    <div className="heading1">
                        <h1>Your Classes Today</h1>
                    </div>

                    <div className="cards todaySchedule flex">
                        <div className="schedule">

                            <div className="singleCard flex">
                                <div className="users">
                                    <img src={class_1} alt="" />
                                </div>

                                <div className="cardText">
                                    <span>
                                        Trending Dance <br /> 18:30 - 19:45
                                    </span>
                                </div>

                                <button className="btn">Check In Now</button>
                            </div>

                            <div className="singleCard flex">
                                <div className="users">
                                    <img src={class_2} alt="" />
                                </div>

                                <div className="cardText">
                                    <span>
                                        Inter Choreo <br /> 18:30 - 19:45
                                    </span>
                                </div>

                                <button className="btn">Check In Now</button>

                            </div>

                        </div>

                    </div>
                </div>
                <div className="singleItem flex cards">
                    <div className="heading1">
                        <h1>All Classes Today</h1>
                    </div>

                    <div className="cards todaySchedule flex">
                        <div className="schedule">

                            <div className="singleCard flex">
                                <div className="users">
                                    <img src={class_1} alt="" />
                                </div>

                                <div className="cardText">
                                    <span>
                                        Trending Dance <br /> 18:30 - 19:45
                                    </span>
                                </div>

                                <button className="btn">Check In Now</button>
                            </div>

                            <div className="singleCard flex">
                                <div className="users">
                                    <img src={class_2} alt="" />
                                </div>

                                <div className="cardText">
                                    <span>
                                        Inter Choreo <br /> 18:30 - 19:45
                                    </span>
                                </div>

                                <button className="btn">Check In Now</button>

                            </div>

                        </div>

                    </div>
                </div>



            </div>
        </div>
    )
}

export default Attendance