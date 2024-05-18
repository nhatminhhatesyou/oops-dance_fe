import React from 'react'
import './activity.css'

//Imported icons ==================>
import { BsArrowRightShort } from "react-icons/bs";

//Imported Images ==================>
import instructor_1 from '../../../Assets_Instructor/dolinh_rmbg.png'
import instructor_2 from '../../../Assets_Instructor/ami_rmbg.png'
import instructor_3 from '../../../Assets_Instructor/bin_rmbg.png'
import instructor_4 from '../../../Assets_Instructor/ducbo_rmbg.png'
import instructor_5 from '../../../Assets_Instructor/chaeng_rmbg.png'

const Activity = () => {
    return (
        <div className='instructorActivitySection'>
            <div className="heading flex">
                <h1>Recent Activity</h1>
                <button className="btn flex">
                    See All <BsArrowRightShort className='icon' />
                </button>
            </div>

            <div className="secContainer grid">

                <div className="singleUser flex">
                    <img src={instructor_1} />
                    <div className="userDetails">
                        <span className="name">Do Linh</span>
                        <small>has just checked-in</small>
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
                <div className="singleUser flex">
                    <img src={instructor_2} />
                    <div className="userDetails">
                        <span className="name">Ngo Huyen</span>
                        <small>has just checked-in</small>
                    </div>
                    <div className="duration">
                        17 min ago
                    </div>
                </div>
                <div className="singleUser flex">
                    <img src={instructor_3} />
                    <div className="userDetails">
                        <span className="name">Bin</span>
                        <small>has just checked-in</small>
                    </div>
                    <div className="duration">
                        17 min ago
                    </div>
                </div>
                <div className="singleUser flex">
                    <img src={instructor_4} />
                    <div className="userDetails">
                        <span className="name">Duc Bo</span>
                        <small>has just checked-in</small>
                    </div>
                    <div className="duration">
                        17 min ago
                    </div>
                </div>
                <div className="singleUser flex">
                    <img src={instructor_5} />
                    <div className="userDetails">
                        <span className="name">Chaeng</span>
                        <small>has just checked-in</small>
                    </div>
                    <div className="duration">
                        17 min ago
                    </div>
                </div>
                <div className="singleUser flex">
                    <img src={instructor_2} />
                    <div className="userDetails">
                        <span className="name">Ngo Huyen</span>
                        <small>has just checked-in</small>
                    </div>
                    <div className="duration">
                        17 min ago
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Activity