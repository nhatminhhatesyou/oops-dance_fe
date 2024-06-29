import React, { useEffect, useState } from 'react'

//Import AOS ==================>
import Aos from 'aos'
import 'aos/dist/aos.css'
import Axios from '../../../../axiosConfig'

// High order array method called MAP to display all data =====>



const Participants = () => {
    const avatar_holder = '/image/upload/v1719635039/avatar-holder_avb7g3.png'
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    const [classes, setClasses] = useState([]);
    const [participants, setParticipants] = useState([]);
    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = () => {
        Axios.get('/class-list/')
            .then((response) => {
                setClasses(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (classes.length > 0) {
            const newParticipants = classes.map((item, index) => {
                const firstStudent = item.students[0] || {};
                return {
                    id: index + 1,
                    destinationImage: item.image,
                    participantImage: firstStudent?.avatar || avatar_holder,
                    participantName: firstStudent?.full_name || firstStudent?.username || '',
                    socialLink: firstStudent.email
                };
            });
            setParticipants(newParticipants);
        }
    }, [classes]);


    //UseEffect to set animation duration====>
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <div className='participants section bg-gradient-to-l from-yellow-500 to-red-500 p-4'>
            <div className="sectionContainer">

                <h2
                    data-aos='fade-down' data-aos-duration='2500'
                    className="text-6xl font-bold"
                    style={{
                        background: 'linear-gradient(to right, #1976D2, #F45E53)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    HALL OF FAME!!!!
                </h2>
                <h2 data-aos='fade-down' data-aos-duration='2500' className='text-2xl font-semibold'>
                    Top participants of this month!
                </h2>

                <div className="participantsContainer grid">


                    {
                        participants.map(({ id, destinationImage, participantImage, participantName, socialLink }) => {
                            return (
                                //single participant card 
                                <div data-aos='fade-up' data-aos-duration='2500' key={id} className="singleparticipant">

                                    <img className='destinationImage' src={`${cloudinaryBaseUrl}/${destinationImage}`} />

                                    <div className="participantDetails">
                                        <div className="participantPicture">
                                            <img src={`${cloudinaryBaseUrl}/${participantImage}`} className='participantImage' />
                                        </div>

                                        <div className="participantName">
                                            <span>{participantName}</span>
                                            <p>{socialLink}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Participants