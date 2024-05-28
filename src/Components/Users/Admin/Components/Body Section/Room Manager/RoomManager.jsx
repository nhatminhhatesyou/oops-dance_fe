import React from 'react'
import './RoomManager.css'

//IMPORTED IMAGES =============>
import room2 from '../../../Assets_Admin/small_room.jpg'
import room1 from '../../../Assets_Admin/large_room.jpg'

const Rooms = () => {
    return (
        <div className='roomManager'>
            <div className='detailDiv sectionContainer'>
                <div className="heading">
                    <h1>Room Details</h1>
                </div>

                <div className="secContainer grid">

                    <div className="singleItem flex">
                        <div className='imgCard flex'>
                            <img src={room1} />
                            <h3>Room 1</h3>
                        </div>
                        <div className='details flex'>
                            <h3>Current status:</h3>
                            <h3>Next use:</h3>
                        </div>
                    </div>

                    <div className="singleItem flex">
                        <div className='imgCard flex'>
                            <img src={room2} />
                            <h3>Room 2</h3>
                        </div>
                        <div className='details flex'>
                            <h3>Current status:</h3>
                            <h3>Next use:</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="statsDiv sectionContainer">
                <div className="heading">
                    <h1>CHART</h1>
                </div>
            </div>
        </div>
    )
}

export default Rooms