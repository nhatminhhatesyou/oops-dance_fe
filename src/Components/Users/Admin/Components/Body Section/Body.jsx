import React from 'react'
import './body.css'
import { useLocation, Route, Routes } from 'react-router-dom';
import ClassManager from './Class Manager/ClassManager';
import Bookings from './Booking Manager/BookingsManager';
import Rooms from './Room Manager/RoomManager';
import MainBody from './Main Body/MainBody';


const Body = () => {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <div className='mainContentAdmin'>
            <Routes>
                <Route path='/' element={<MainBody />} />
                <Route path='classes' element={<ClassManager />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="rooms" element={<Rooms />} />

            </Routes>
        </div>
    )
}

export default Body