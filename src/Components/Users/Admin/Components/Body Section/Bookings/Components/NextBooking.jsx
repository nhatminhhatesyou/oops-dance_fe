import React from 'react'

import small_room from '../../../../Assets_Admin/small_room.jpg'
import large_room from '../../../../Assets_Admin/large_room.jpg'

// IMPORTED ICONS =====================================>
import { BsArrowRightShort } from "react-icons/bs";

const NextBooking = () => {
    return (
        <div className='nextBooking sectionContainer'>
            <div className="heading">
                <h1>Next Booking</h1>
            </div>

            <div className="secContainer grid">

                <div className="singleItem flex">
                    <div className='imgCard flex'>
                        <img src={small_room} />
                        <h3>Small Room</h3>
                    </div>
                    <div className='details flex'>
                        <h3>Current status:</h3>
                        <h3>Next booking:</h3>
                    </div>
                </div>

                <div className="singleItem flex">
                    <div className='imgCard flex'>
                        <img src={large_room} />
                        <h3>Large Room</h3>
                    </div>
                    <div className='details'>
                        <span>Deltail...</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NextBooking