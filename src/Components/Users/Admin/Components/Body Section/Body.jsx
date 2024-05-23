import React from 'react'
import './body.css'
import { useLocation, Route, Routes } from 'react-router-dom';
import ClassManager from './Classes Management/ClassManager';
import Bookings from './Bookings/Bookings';
import MainBody from './Main Body/MainBody';


const Body = () => {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <div className='mainContentAdmin'>
            <Routes>
                <Route path={'/'} element={<MainBody />} />
                <Route path={'/classes'} element={<ClassManager />} />
                <Route path={'/bookings'} element={<Bookings />} />

            </Routes>
        </div>
    )
}

export default Body