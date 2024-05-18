import React from 'react'
import './body.css'
import { useLocation, Route, Routes } from 'react-router-dom';
import Main from './Main/main'
import ClassManager from './Classes Management/ClassManager'
import Classes from '../../../../HomePage/Components/Classes/Classes';


const Body = () => {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <div className='mainContentAdmin'>
            <Routes>
                <Route path={'/classes'} element={<ClassManager />} />
                <Route path={'/'} element={<Main />} />
            </Routes>
        </div>
    )
}

export default Body