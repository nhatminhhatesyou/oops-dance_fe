import React from 'react'
import './listing.css'
import { Link, useNavigate } from 'react-router-dom'

//Imported images ==================>
import class_1 from '../../../../Assets_Admin/dolinh_class_1.jpeg'
import class_2 from '../../../../Assets_Admin/dolinh_class_2.jpg'
import small_room from '../../../../Assets_Admin/small_room.jpg'
import large_room from '../../../../Assets_Admin/large_room.jpg'


//Imported icons ==================>
import { BsArrowRightShort } from "react-icons/bs";


const Listing = () => {
    const navigateTo = useNavigate()
    const handleNavigate = (path) => {
        navigateTo(path);
    }

    return (
        <div className='adminListingSection'>
            <div className="cards roomsManagement">
                <div className="heading flex">
                    <h1>Rooms Management</h1>
                    <button onClick={() => handleNavigate('/admin/rooms')} className="btn flex">
                        See All <BsArrowRightShort className='icon' />
                    </button>
                </div>

                <div className="secContainer flex">
                    <div className="singleItem">
                        <img src={small_room} />
                        <h3>Small Room</h3>
                    </div>

                    <div className="singleItem">
                        <img src={large_room} />
                        <h3>Large Room</h3>
                    </div>
                </div>
            </div>

            <div className="cards classesManagement flex">
                <div className="schedule">
                    <div className="heading flex">
                        <h3>Today's Classes</h3>
                        <button onClick={() => handleNavigate('/admin/students')} className="btn flex">
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

                        <button className="btn">See Status</button>
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

                        <button className="btn">See Status</button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Listing