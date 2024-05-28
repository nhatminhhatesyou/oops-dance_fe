import React from 'react'
import './body.css'
import { Route, Routes } from 'react-router-dom';

import MainBody from './Components/Main Body/MainBody';
import Attendance from './Components/Attendance/Attendance';

const Body = () => {
    return (
        <div className='mainContentInstructor'>
            <Routes>
                <Route path='/' element={<MainBody />} />
                <Route path='attendance' element={<Attendance />} />
            </Routes>
        </div>
    )
}

export default Body