import React from 'react'
import './body.css'
import Top from './Top Section/Top'
import Listing from './Listing Section/Listing'
import Activity from './Activity Section/Activity'

const Body = () => {
    return (
        <div className='mainContentInstructor'>
            <Top />

            <div className="bottom flex">
                <Listing />
                <Activity />
            </div>

        </div>
    )
}

export default Body