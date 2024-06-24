import React from 'react'
import './body.css'
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../../../../../AuthContext';

import Attendance from './Components/Attendance/Attendance';
import Instructor_MyClasses from './Components/My Classes - Instructor/MyClasses';
import Guest_MyClasses from './Components/My Classess - Guest/MyClasses';
import MyBookings from './Components/My Bookings/MyBookings';
import Setting from './Components/Setting/Setting';
// import TableTemplate from '../../../../Table/TableTemplate';


const Body = () => {
    const { user } = useAuth();

    return (
        <div className='mainContentInstructor'>
            <Routes>
                <Route path='/' element={<Setting />} />
                <Route path='my-bookings' element={<MyBookings />} />
                <Route path='my-profile' element={<Setting />} />

                {user.role === 'instructor' ? (
                    <>
                        <Route path='attendance' element={<Attendance />} />
                        <Route path='my-classes' element={<Instructor_MyClasses />} />
                    </>
                ) : user.role === 'guest' ? (
                    <>
                        <Route path='my-classes' element={<Guest_MyClasses />} />
                    </>
                ) : null}

            </Routes>
        </div>
    )
}

export default Body