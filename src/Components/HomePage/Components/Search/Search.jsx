import React, { useEffect } from 'react'

//Import Icons ================>
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";

//Import AOS ==================>
import Aos from 'aos'
import 'aos/dist/aos.css'

const Search = () => {
    //UseEffect to set animation duration====>
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <div className='search container section'>
            <div data-aos='fade-up' data-aos-duration='2500' className="sectionContainer grid">

                <div className="roomInfo">
                    <div className="room1">

                    </div>

                    <div className="room2">

                    </div>
                </div>


                <div className="btns flex">

                    <div className="singleBtn">
                        <span>Room 1</span>
                    </div>

                    <div className="singleBtn">
                        <span>Room 2</span>
                    </div>

                    <div className="singleBtn">
                        <span>All Rooms</span>
                    </div>

                </div>


                <div data-aos='fade-up' data-aos-duration='2000' className="searchInputs flex">

                    {/* Single Input */}
                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <RxCalendar className='icon' />
                        </div>
                        <div className="texts">
                            <h4>Check In</h4>
                            <input type="text" placeholder='Add date & time' />
                        </div>
                    </div>
                    {/* Single Input */}
                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <RxCalendar className='icon' />
                        </div>
                        <div className="texts">
                            <h4>Check Out</h4>
                            <input type="text" placeholder='Add date & time' />
                        </div>
                    </div>
                </div>
                <button className='btn'>Search Room</button>

            </div>
        </div>
    )
}

export default Search