import React, { useEffect, useState } from 'react';
import './listing.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../../../../../AuthContext'


//Imported images ==================>
import class_1 from '../../../../../Assets_Instructor/dolinh_class_1.jpeg'
import class_2 from '../../../../../Assets_Instructor/dolinh_class_2.jpg'

//Imported icons ==================>
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import axios from '../../../../../../../../axiosConfig';


const Listing = () => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState([])

    const fetchUserInfo = () => {
        axios.get(`/users/${user.id}`)
            .then((response) => {
                setUserInfo(response.data)
            })
            .catch((error) => {
                console.log("Error fetching User Info:", error)
            })
    }

    useEffect(() => {
        fetchUserInfo();
    }, [user])

    const navigateTo = useNavigate()
    const handleNavigate = (path) => {
        navigateTo(path);
    }

    return (
        <div className='instructorListingSection'>
            <div className="cards myClasses">
                <div className="heading flex">
                    <h1>My Classes</h1>
                    <button onClick={() => handleNavigate('/instructor/my-classes')} className="btn flex">
                        See All <BsArrowRightShort className='icon' />
                    </button>
                </div>

                <div className="secContainer flex">

                    <div className="singleItem">
                        <AiFillHeart className='icon' />
                        <img src={class_1} />
                        <h3>Trending Dance</h3>
                    </div>

                    <div className="singleItem">
                        <AiOutlineHeart className='icon' />
                        <img src={class_2} />
                        <h3>Inter Choreo</h3>
                    </div>
                </div>
            </div>

            <div className="cards todaySchedule flex">
                <div className="schedule">
                    <div className="heading flex">
                        <h3>My Schedule Today</h3>
                        <button onClick={() => handleNavigate('/instructor/attendance')} className="btn flex">
                            See All <BsArrowRightShort className='icon' />
                        </button>
                    </div>

                    <div className="singleCard flex">
                        <div className="users">
                            <img src={class_1} alt="" />
                        </div>

                        <div className="cardText">
                            <span>
                                Trending Dance <br /> 18:30 - 19:45
                            </span>
                        </div>

                        <button onClick={() => handleNavigate('/instructor/attendance')} className="btn">Check In Now</button>
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

                        <button onClick={() => handleNavigate('/instructor/attendance')} className="btn">Check In Now</button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Listing