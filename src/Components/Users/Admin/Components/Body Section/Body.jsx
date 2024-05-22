import React from 'react'
import './body.css'
import { useLocation, Route, Routes } from 'react-router-dom';
import Main from './Main/main'
import ClassManager from './Classes Management/ClassManager'
import Classes from '../../../../HomePage/Components/Classes/Classes';
import Bookings from './Bookings/Bookings';


const Body = () => {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <div className='mainContentAdmin'>
            <Routes>
                <Route path={'/'} element={<Main />} />
                <Route path={'/classes'} element={<ClassManager />} />
                <Route path={'/bookings'} element={<Bookings />} />

            </Routes>
        </div>
    )
}

export default Body