import React, { useEffect } from 'react'

//Imported Icons ========>
import { RxCalendar } from "react-icons/rx";
import { BsShieldCheck } from "react-icons/bs";
import { BsBookmarkCheck } from "react-icons/bs";

//Import AOS ==================>
import Aos from 'aos'
import 'aos/dist/aos.css'

const Info = () => {
    //UseEffect to set animation duration====>
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <div className='info section'>
            <div className="infoContainer container">

                <div className="titleDiv flex">
                    <h2 data-aos='fade-right' data-aos-duration='2500' className='font-bold text-3xl'> Crafting Unforgettable Experiences Just For You</h2>
                </div>

                <div className="cardsDiv grid">

                    <div data-aos='fade-up' data-aos-duration='2500' className="singleCard grid">
                        <div className="iconDiv flex">
                            <RxCalendar className='icon' />
                        </div>
                        <span className='cardTitle'>Book & Relax</span>
                        <p>Effortless booking with instant confirmation lets you relax and focus on your dance.</p>
                    </div>

                    <div data-aos='fade-up' data-aos-duration='4500' className="singleCard grid">
                        <div className="iconDiv flex colorOne">
                            <BsShieldCheck className='icon' />
                        </div>
                        <span className='cardTitle'>Smart Checklist</span>
                        <p>Get ready seamlessly with our checklist, ensuring nothing is missed for your session.</p>
                    </div>

                    <div data-aos='fade-up' data-aos-duration='6500' className="singleCard grid">
                        <div className="iconDiv flex colorTwo">
                            <BsBookmarkCheck className='icon' />
                        </div>
                        <span className='cardTitle'>Save More</span>
                        <p>Book with us to enjoy discounts and save on top-quality studio spaces.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Info