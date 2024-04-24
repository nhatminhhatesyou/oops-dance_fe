import React, { useEffect } from 'react'

//Imported Destination Images ==============>
import paris from '../../assets/paris.jpg'
import newyork from '../../assets/newyork.jpg'
import london from '../../assets/london.jpg'

//Imported Participants Images ==============>
import participant1 from '../../assets/user_1.jpg'
import participant2 from '../../assets/user_2.jpg'
import participant3 from '../../assets/user_3.jpg'

//Import AOS ==================>
import Aos from 'aos'
import 'aos/dist/aos.css'

// High order array method called MAP to display all data =====>

const participant = [
    {
        id: 1,
        destinationImage: paris,
        participantImage: participant1,
        participantName: 'Somi Xinh',
        socialLink: '@somixinhngok'
    },
    {
        id: 2,
        destinationImage: newyork,
        participantImage: participant2,
        participantName: 'Obanh Xinh',
        socialLink: '@obanhdangghec'
    },
    {
        id: 3,
        destinationImage: london,
        participantImage: participant3,
        participantName: 'Nminh Xinh',
        socialLink: '@nminhxinhnhattg'
    }
]


const Participants = () => {
    //UseEffect to set animation duration====>
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <div className='participants container section'>
            <div className="sectionContainer">
                <h2 data-aos='fade-down' data-aos-duration='2500'>
                    Top participants of this month!
                </h2>

                <div className="participantsContainer grid">


                    {
                        participant.map(({ id, destinationImage, participantImage, participantName, socialLink }) => {
                            return (
                                //single participant card 
                                <div data-aos='fade-up' data-aos-duration='2500' key={id} className="singleparticipant">

                                    <img className='destinationImage' src={destinationImage} />

                                    <div className="participantDetails">
                                        <div className="participantPicture">
                                            <img src={participantImage} className='participantImage' />
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