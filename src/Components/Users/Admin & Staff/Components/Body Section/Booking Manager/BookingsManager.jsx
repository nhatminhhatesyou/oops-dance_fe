import React from 'react'
import './bookingsManager.css'
import BookingList from './Components/BookingList/BookingList'

const Bookings = () => {
    return (
        <div className='adminBookings'>
            <BookingList />
        </div>
    )
}

export default Bookings