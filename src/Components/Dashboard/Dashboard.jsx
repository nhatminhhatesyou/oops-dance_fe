import React from 'react'
import SideBar from './Components/SideBar Section/SideBar'
import Body from './Components/Body Section/Body'
import './DashBoard.css'

const Dashboard = () => {
    return (
        <div className='dashBoardContainer flex'>
            <SideBar />
            <Body />

        </div>
    )
}

export default Dashboard