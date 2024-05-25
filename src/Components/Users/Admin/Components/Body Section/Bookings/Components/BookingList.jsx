import React from 'react'

//IMPORTED ICON ================>
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";


const BookingList = () => {
    return (
        <div className='bookingList sectionContainer'>
            <div className="heading">
                <h1>Booking List</h1>

                <div className="tableDiv flex">
                    <h2>Booking List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Guest ID</th>
                                <th>Room ID</th>
                                <th>Date</th>
                                <th>Checkin</th>
                                <th>Checkout</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>

                    <button className="btn" >Add Booking</button>
                </div>
            </div>
        </div>
    )
}

export default BookingList