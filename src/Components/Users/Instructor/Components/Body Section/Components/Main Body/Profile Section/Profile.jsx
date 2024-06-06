import React, { useEffect, useState } from 'react';
import './Profile.css'
import { useAuth } from '../../../../../../../../AuthContext'
import axios from '../../../../../../../../axiosConfig';

const Profile = () => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    const { user } = useAuth();

    return (
        <div className='profileSection flex'>

            <div className="avatarDiv">
                AVATAR
            </div>

            <div className="personalInfoDiv">
                <h3>Full Name:</h3>
                <h3>Email:</h3>
                <h3>Contact Number:</h3>
            </div>
        </div>
    )
}

export default Profile