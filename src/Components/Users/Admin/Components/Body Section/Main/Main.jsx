import React from 'react'
import './main.css'
import Top from './Top Section/Top'
import Listing from './Listing Section/Listing'
import Activity from './Activity Section/Activity'


const Main = () => {
    return (
        <div className='mainAdmin'>
            <Top />
            <div className="bottom flex">
                <Listing />
                <Activity />
            </div>
        </div>
    )
}

export default Main