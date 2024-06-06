import React from 'react'
import './body.css'
import { Route, Routes } from 'react-router-dom';

import MainBody from './Components/Main Body/MainBody';
import Attendance from './Components/Attendance/Attendance';
import MyClasses from './Components/My Classes/MyClasses';
import MyBookings from './Components/My Bookings/MyBookings';


const Body = () => {
    return (
        <div className='mainContentInstructor'>
            <Routes>
                <Route path='/' element={<MainBody />} />
                <Route path='attendance' element={<Attendance />} />
                <Route path='my-classes' element={<MyClasses />} />
                <Route path='my-bookings' element={<MyBookings />} />
            </Routes>
        </div>
    )
}

export default Body