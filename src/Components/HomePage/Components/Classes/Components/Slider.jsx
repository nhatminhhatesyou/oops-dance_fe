import React, { useEffect, useRef, useState } from 'react';
import '../style.css';
import axios from '../../../../../axiosConfig';

const Slider = () => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    const [classImages, setClassImages] = useState([]);
    const [classThumbnails, setClassThumbnails] = useState([]);

    const fetchClassData = async () => {
        try {
            const response = await axios.get(`/class-list/`);
            const data = response.data;
            const images = data.map((item) => item.image);
            const thumbnails = [images[images.length - 1], ...images.slice(0, -1)];
            setClassImages(images);
            setClassThumbnails(thumbnails);
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
    };

    useEffect(() => {
        fetchClassData();
    }, []);

    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const carouselRef = useRef(null);
    const sliderRef = useRef(null);
    const thumbnailBorderRef = useRef(null);
    const timeRef = useRef(null);

    useEffect(() => {
        const nextDom = nextRef.current;
        const prevDom = prevRef.current;
        const carouselDom = carouselRef.current;
        const sliderDom = sliderRef.current;
        const thumbnailBorderDom = thumbnailBorderRef.current;

        const timeRunning = 500;
        const timeAutoNext = 10000;

        let runTimeOut;
        let runNextAuto;

        const showSlider = (type) => {
            const sliderItemsDom = sliderDom.querySelectorAll('.carousel .list .item');
            const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

            if (type === 'next') {
                sliderDom.appendChild(sliderItemsDom[0]);
                thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
                carouselDom.classList.add('next');
            } else {
                sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
                thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
                carouselDom.classList.add('prev');
            }

            clearTimeout(runTimeOut);
            runTimeOut = setTimeout(() => {
                carouselDom.classList.remove('next');
                carouselDom.classList.remove('prev');
            }, timeRunning);

            clearTimeout(runNextAuto);
            runNextAuto = setTimeout(() => {
                nextDom.click();
            }, timeAutoNext);
        };

        nextDom.onclick = () => {
            showSlider('next');
        };

        prevDom.onclick = () => {
            showSlider('prev');
        };

        runNextAuto = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);

        return () => {
            clearTimeout(runTimeOut);
            clearTimeout(runNextAuto);
        };
    }, [classImages, classThumbnails]);

    return (
        <div className='classes-slider m-20 w-[80vw]'>
            <div className="carousel " ref={carouselRef}>
                <div className="list" ref={sliderRef}>
                    {classImages.map((img, index) => (
                        <div className="item" key={index}>
                            <img className='w-64' src={`${cloudinaryBaseUrl}/${img}`} alt={`Slide ${index}`} />
                            {/* <div className="content">
                                <div className="author">LUNDEV</div>
                                <div className="title">DESIGN SLIDER</div>
                                <div className="topic">ANIMAL</div>
                                <div className="des">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                                </div>
                                <div className="buttons">
                                    <button>SEE MORE</button>
                                    <button>SUBSCRIBE</button>
                                </div>
                            </div> */}
                        </div>
                    ))}
                </div>

                <div className="thumbnail" ref={thumbnailBorderRef}>
                    {classThumbnails.map((img, index) => (
                        <div className="item" key={index}>
                            <img src={`${cloudinaryBaseUrl}/${img}`} alt={`Thumbnail ${index}`} />
                            <div className="content">
                                <div className="title">Name Slider</div>
                                <div className="description">Description</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="arrows">
                    <button id="prev" ref={prevRef}>&lt;</button>
                    <button id="next" ref={nextRef}>&gt;</button>
                </div>

                <div className="time" ref={timeRef}></div>
            </div>
        </div>
    );
};

export default Slider;
