import React from 'react'
import './Profile.css'
import { useAuth } from '../../../../../../../AuthContext'


const Profile = () => {
    const { user } = useAuth();
    console.log("USER:", user)

    return (
        <div className='profile sectionContainer'>
            <div className="heading">
                <h1>My Profile Setting</h1>
            </div>

            <div className="personalInfo">
                clgt
            </div>
        </div>
    )
}

export default Profile