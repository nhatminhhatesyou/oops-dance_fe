import React from 'react'
import './bookings.css'
import NextBooking from './Components/NextBooking'
import BookingList from './Components/BookingList'

const Bookings = () => {
    return (
        <div className='adminBookings'>
            <NextBooking />
            <BookingList />
        </div>
    )
}

export default Bookings