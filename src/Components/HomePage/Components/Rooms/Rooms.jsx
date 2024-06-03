import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'



//Imported Images ======>
import imageGrid from '../../Assets_HomePage/studio-Image2.jpg'

//room1:
import room1_1 from '../../Assets_HomePage/room1_1.jpg'
import room1_2 from '../../Assets_HomePage/room1_2.jpg'
import room1_3 from '../../Assets_HomePage/room1_3.jpg'

//room2:
import room2_1 from '../../Assets_HomePage/room2_1.jpg'
import room2_2 from '../../Assets_HomePage/room2_2.jpg'
import room2_3 from '../../Assets_HomePage/room2_3.jpg'
import room2_4 from '../../Assets_HomePage/room2_4.jpg'
import room2_5 from '../../Assets_HomePage/room2_5.jpg'
import room2_6 from '../../Assets_HomePage/room2_6.jpg'
//Import AOS ==================>
import Aos from 'aos'
import 'aos/dist/aos.css'


const Rooms = () => {
    //UseEffect to set animation duration====>
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        < div className='rooms section flex' >

            <div className="sectionContainer container flex">
                <h1>WELCOME TO OUR SPACE</h1>
                <p>Explore our studio with 2 modern spaces</p>

                <div className="room1 flex">
                    <div className="headerDiv">
                        <h1>ROOM 1</h1>
                    </div>

                    <div className="roomsDetail flex">
                        <div className="roomImages">
                            <Swiper
                                className='swiper'
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                loop={true}
                                slidesPerView={'auto'}
                                coverflowEffect={
                                    {
                                        rotate: 0,
                                        stretch: 50,
                                        depth: 100,
                                        modifier: 2.5,

                                    }
                                }
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                    clickable: true,
                                }}
                                modules={[EffectCoverflow, Pagination, Navigation]}
                            >
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room2_1} />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room2_2} />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room2_3} />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room2_4} />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room2_5} />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room2_6} />
                                </SwiperSlide>

                                <div className="slider-controler">
                                    <div className="swiper-button-prev slider-arrow">

                                    </div>
                                    <div className="swiper-button-next slider-arrow">

                                    </div>
                                </div>

                            </Swiper>
                        </div>
                        <div className="textDiv">
                            <h1>110m2</h1>
                        </div>
                    </div>

                </div>

                <div className="room2 flex">
                    <div className="headerDiv">
                        <h1>ROOM 2</h1>
                    </div>

                    <div className="roomsDetail flex">
                        <div className="roomImages">

                            <Swiper
                                className='swiper'
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                loop={true}
                                slidesPerView={'auto'}
                                spaceBetween={0}
                                coverflowEffect={
                                    {
                                        rotate: 0,
                                        stretch: 50,
                                        depth: 100,
                                        modifier: 2.5,
                                    }
                                }

                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                    clickable: true,
                                }}
                                modules={[EffectCoverflow, Pagination, Navigation]}
                            >
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room1_1} />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room1_2} />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room1_3} />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room1_1} />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room1_2} />
                                </SwiperSlide>
                                <SwiperSlide className='swiper-slide'>
                                    <img src={room1_3} />
                                </SwiperSlide>

                                <div className="slider-controler">
                                    <div className="swiper-button-prev slider-arrow">

                                    </div>
                                    <div className="swiper-button-next slider-arrow">

                                    </div>
                                </div>

                            </Swiper>
                        </div>
                        <div className="textDiv">
                            <h1>80m2</h1>
                        </div>
                    </div>
                </div>


            </div>

        </div >
    )
}

export default Rooms