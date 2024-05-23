import React from 'react'
import './main_body.css'
import Top from './Top Section/Top'
import Listing from './Listing Section/Listing'
import Activity from './Activity Section/Activity'


const MainBody = () => {
    return (<div className='mainBody' > <Top /> <div className="bottom flex" > <Listing /> <Activity /> </div> </div>)
}

export default MainBody