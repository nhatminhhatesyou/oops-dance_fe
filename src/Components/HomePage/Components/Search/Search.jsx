import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RxCalendar } from 'react-icons/rx';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

//IMPORTED ICON ================>
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";



const Search = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedRoom, setSelectedRoom] = useState('All Rooms');
    const [availableSlots, setAvailableSlots] = useState({});
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRoomAvailable, setIsRoomAvailable] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const handleRoomChange = (room) => {
        console.log('Selected room:', room);
        setSelectedRoom(room);
    };

    const fetchAvailableSlots = async (date) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/available-rooms`, {
                params: {
                    date: date.toISOString().split('T')[0],
                },
            });
            console.log('sent data: on', date.toISOString().split('T')[0]);
            console.log('fetch data: ', response.data);
            setAvailableSlots(response.data);
        } catch (error) {
            console.error('Error fetching available slots:', error);
        }
    };

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleCheckInChange = (value) => {
        setCheckInTime(value);
        if (value === '' || checkOutTime === '' || value < checkOutTime) {
            setErrorMessage('');
            setShowResults(false); // Hide results when resetting the time
        } else {
            setErrorMessage('Check-in time must be before check-out time.');
        }
    };

    const handleCheckOutChange = (value) => {
        setCheckOutTime(value);
        if (value === '' || checkInTime === '' || checkInTime < value) {
            setErrorMessage('');
            setShowResults(false); // Hide results when resetting the time
        } else {
            setErrorMessage('Check-in time must be before check-out time.');
        }
    };

    const handleSearch = async () => {
        console.log('Searching for rooms with:', startDate, selectedRoom, 'from', checkInTime, 'to', checkOutTime);
        if (!errorMessage) {
            await fetchAvailableSlots(startDate);
            setShowResults(true);

            // Kiểm tra và cập nhật trạng thái phòng trống
            if (selectedRoom !== 'All Rooms' && checkInTime && checkOutTime) {
                const slots = availableSlots[selectedRoom] || [];
                const roomAvailable = isSlotAvailable(checkInTime, checkOutTime, slots);
                setIsRoomAvailable(roomAvailable);
            } else {
                setIsRoomAvailable(false);
            }
        }
    };

    const isTimeInRange = (time, rangeStart, rangeEnd) => {
        const [timeH, timeM] = time.split(':').map(Number);
        const [rangeStartH, rangeStartM] = rangeStart.split(':').map(Number);
        const [rangeEndH, rangeEndM] = rangeEnd.split(':').map(Number);

        const timeInMinutes = timeH * 60 + timeM;
        const rangeStartInMinutes = rangeStartH * 60 + rangeStartM;
        const rangeEndInMinutes = rangeEndH * 60 + rangeEndM;

        return timeInMinutes >= rangeStartInMinutes && timeInMinutes <= rangeEndInMinutes;
    };

    const isSlotAvailable = (checkIn, checkOut, slots) => {
        for (let slot of slots) {
            if (
                isTimeInRange(checkIn, slot[0], slot[1]) &&
                isTimeInRange(checkOut, slot[0], slot[1])
            ) {
                return true;
            }
        }
        return false;
    };

    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 8; hour <= 22; hour++) {
            times.push(`${hour.toString().padStart(2, '0')}:00`);
            times.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        return times;
    };

    const timeOptions = generateTimeOptions();


    // Guest Booking Info
    const [guestFullName, setGuestFullName] = useState('')
    const [guestEmail, setGuestEmail] = useState('')
    const [guestPhoneNum, setGuestPhoneNum] = useState('')
    const [activeForm, setActiveForm] = useState('formDiv')
    const [blur, setBlur] = useState('blurLayer')


    const removeForm = () => {
        setActiveForm('formDiv')
        setBlur('blurLayer')
    }

    const showForm = () => {
        setActiveForm('formDiv showForm')
        setBlur('blurLayer showLayer')
    }


    return (
        <div className='search container section'>
            <div data-aos='fade-up' data-aos-duration='2500' className='sectionContainer flex'>
                <div className="guide icon">
                    <FaRegQuestionCircle />
                </div>
                <div className='btns flex'>
                    <div
                        className={`singleBtn ${selectedRoom === 'Room1' ? 'active' : ''}`}
                        onClick={() => handleRoomChange('Room1')}
                    >
                        <span>Room 1</span>
                    </div>
                    <div
                        className={`singleBtn ${selectedRoom === 'Room2' ? 'active' : ''}`}
                        onClick={() => handleRoomChange('Room2')}
                    >
                        <span>Room 2</span>
                    </div>
                    <div
                        className={`singleBtn ${selectedRoom === 'All Rooms' ? 'active' : ''}`}
                        onClick={() => handleRoomChange('All Rooms')}
                    >
                        <span>All Rooms</span>
                    </div>
                </div>

                <div data-aos='fade-up' data-aos-duration='2000' className='searchInputs grid'>
                    <div className='singleInput flex'>
                        <div className='iconDiv'>
                            <RxCalendar className='icon' />
                        </div>
                        <div className='texts'>
                            <h4>Select Date</h4>
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                dateFormat='dd/MM/yyyy'
                                placeholderText='Choose a date'
                            />
                        </div>
                    </div>
                    <div className='singleInput flex'>
                        <div className='iconDiv'>
                            <RxCalendar className='icon' />
                        </div>
                        <div className='texts'>
                            <h4>Check In</h4>
                            <select
                                value={checkInTime}
                                onChange={(e) => handleCheckInChange(e.target.value)}
                                disabled={!startDate}
                            >
                                <option value=''>Select Time</option>
                                {timeOptions.map((time, index) => (
                                    <option key={index} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='singleInput flex'>
                        <div className='iconDiv'>
                            <RxCalendar className='icon' />
                        </div>
                        <div className='texts'>
                            <h4>Check Out</h4>
                            <select
                                value={checkOutTime}
                                onChange={(e) => handleCheckOutChange(e.target.value)}
                                disabled={!startDate}
                            >
                                <option value=''>Select Time</option>
                                {timeOptions.map((time, index) => (
                                    <option key={index} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <button data-aos='fade-up' data-aos-duration='2500' className='btn' onClick={handleSearch}>
                    Search Room
                </button>

                {errorMessage && <div className='error-message'>{errorMessage}</div>}

                <div className={`searchResult ${showResults && !errorMessage ? 'visible' : 'hidden'}`}>
                    {selectedRoom === 'All Rooms' ? (
                        Object.keys(availableSlots).map((room) => (
                            <div key={room}>
                                <h2>{room}:</h2>
                                {checkInTime && checkOutTime ? (
                                    isSlotAvailable(checkInTime, checkOutTime, availableSlots[room] || []) ? (
                                        <p>Room is available from {checkInTime} to {checkOutTime}</p>
                                    ) : (
                                        <p>Room is not available from {checkInTime} to {checkOutTime}</p>
                                    )
                                ) : (
                                    availableSlots[room].map((slot, index) => (
                                        <p key={index}>{slot[0]} - {slot[1]}</p>
                                    ))
                                )}
                            </div>
                        ))
                    ) : (
                        <div>
                            <h1>{selectedRoom}: </h1>
                            {checkInTime && checkOutTime ? (
                                isSlotAvailable(checkInTime, checkOutTime, availableSlots[selectedRoom] || []) ? (
                                    <>
                                        <p>{selectedRoom} is available from {checkInTime} to {checkOutTime}</p>
                                        {isRoomAvailable && <button className='btn' onClick={showForm}>Book Now</button>}
                                    </>
                                ) : (
                                    <p>{selectedRoom} is not available from {checkInTime} to {checkOutTime}</p>
                                )
                            ) : (
                                availableSlots[selectedRoom] && availableSlots[selectedRoom].map((slot, index) => (
                                    <p key={index}>{slot[0]} - {slot[1]}</p>
                                ))
                            )}
                        </div>
                    )}
                </div>


            </div>

            {/* BOOKING FORM */}
            <div className={activeForm}>
                <form action="" className="form flex" >
                    <IoIosCloseCircle className='icon' onClick={removeForm} />
                    <div className="guestInfo flex">
                        <h2>Confirm your information and your booking</h2>
                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="guestFullName">Your Full Name</label>
                            <div className="input flex">
                                <input type="text" id='guestFullName' placeholder='Enter' onChange={(event) => {
                                    setGuestFullName(event.target.value)
                                }} />
                            </div>
                        </div>
                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="guestEmail">Your Email</label>
                            <div className="input flex">
                                <input type="text" id='guestEmail' placeholder='Enter' onChange={(event) => {
                                    setGuestEmail(event.target.value)
                                }} />
                            </div>
                        </div>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="guestPhoneNum">Phone Number</label>
                            <div className="input flex">
                                <input type="text" id='guestPhoneNum' placeholder='Enter' onChange={(event) => {
                                    setGuestPhoneNum(event.target.value)
                                }} />
                            </div>
                        </div>
                    </div>

                    <div className="bookingInfo flex">
                        <h2>Your Booking</h2>
                        <p>Room: {selectedRoom}</p>
                        <p>Date: {startDate.toDateString()}</p>
                        <p>Check In: {checkInTime}</p>
                        <p>Check Out: {checkOutTime}</p>
                    </div>




                    {/* ADD-CLASS STATUS */}
                    {/* <span className={statusHolder}>{bookingFormStatus}</span> */}

                    {/* SUBMIT BUTTON */}
                    <button type='submit' className='btn' >
                        <span>Confirm</span>
                    </button>
                </form>
            </div>

            <div className={blur}></div>
        </div>
    );
};

export default Search;
