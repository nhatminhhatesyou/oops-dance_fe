import React from 'react'
import './body.css'
import { useLocation, Route, Routes } from 'react-router-dom';
import ClassManager from './Class Manager/ClassManager';
import Bookings from './Booking Manager/BookingsManager';
import Rooms from './Room Manager/RoomManager';
import MainBody from './Main Body/MainBody';
import Attendance from './Attendance/Attendance';
import Students from './Students/Students';
import UserManager from './User Manager/UserManager';


const Body = () => {
    const location = useLocation();
    return (
        <div className='mainContentAdmin'>
            <Routes>
                <Route path='/' element={<MainBody />} />
                <Route path='classes' element={<ClassManager />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="rooms" element={<Rooms />} />
                <Route path="attendance-records" element={<Attendance />} />
                <Route path="students" element={<Students />} />
                <Route path="users" element={<UserManager />} />

            </Routes>
        </div>
    )
}

export default Body