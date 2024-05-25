import React from 'react'
import './top.css'

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
                        <img src={user1} />
                    </div>
                </div>

            </div>

            <div className="cardSection flex">

                <div className="rightCard flex">
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
                            <h1>Studio Stats</h1>

                            <div className="studioStats ">
                                <span className='rooms flex'>
                                    <div className="title">
                                        <h3>Rooms status</h3>
                                    </div>
                                    <div className="roomsStatus">
                                        <small>Small room: </small>  <small>ocupied by</small><br />
                                        <small>Large room: </small>  <small>ocupied by</small><br />
                                    </div>
                                </span>

                                <span className='participants flex'>
                                    <div className="title">
                                        <h3>Number of participants this month:</h3>
                                    </div>
                                    <div className="participantsStatus">
                                        <small>1000 </small>
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
                        <button className='btn'>Go to help center</button>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default Top