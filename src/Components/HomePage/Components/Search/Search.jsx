import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RxCalendar } from 'react-icons/rx';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from '../../../../axiosConfig';
import { useAuth } from '../../../../AuthContext';


//IMPORTED ICON ================>
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const Search = () => {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [roomList, setRoomList] = useState([]);
    const [deposit, setDeposit] = useState();
    const [selectedRoom, setSelectedRoom] = useState('All Rooms');
    const [availableSlots, setAvailableSlots] = useState({});
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRoomAvailable, setIsRoomAvailable] = useState(false);
    const [activeForm, setActiveForm] = useState('formDiv');
    const [blur, setBlur] = useState('blurLayer');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const fetchRoomList = async () => {
        try {
            const response = await axios.get(`/rooms/`);
            setRoomList(response.data);
        } catch (error) {
            console.error('Error fetching room list:', error);
        }
    };

    useEffect(() => {
        fetchRoomList();
    }, []);

    const handleRoomChange = (room) => {
        setSelectedRoom(room);
    };

    const fetchAvailableSlots = async (date) => {
        try {
            const response = await axios.get(`/available-rooms`, {
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

    const calculateTimeSlots = (checkIn, checkOut) => {
        const [checkInH, checkInM] = checkIn.split(':').map(Number);
        const [checkOutH, checkOutM] = checkOut.split(':').map(Number);

        const checkInTimeInMinutes = checkInH * 60 + checkInM;
        const checkOutTimeInMinutes = checkOutH * 60 + checkOutM;

        return (checkOutTimeInMinutes - checkInTimeInMinutes) / 30;
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

    const removeForm = () => {
        setActiveForm('formDiv');
        setBlur('blurLayer');
    };

    const removeConfirmation = () => {
        setShowConfirmation(false);
        setBlur('blurLayer');
    };

    const showForm = () => {
        console.log("date: ", startDate.toISOString().split('T')[0]);
        console.log("selected ROOM: ", selectedRoom);
        console.log("Room list: ", roomList);
        console.log("Cal Time: ", calculateTimeSlots(checkInTime, checkOutTime));
        roomList.map((room) => {
            if (selectedRoom === room.name) {
                console.log("Price:", room.price)
                console.log("Full Price:", (calculateTimeSlots(checkInTime, checkOutTime)) * room.price / 2)
                setDeposit((calculateTimeSlots(checkInTime, checkOutTime)) * room.price / 4)
                console.log("Deposit:", deposit)
            }
        })


        setActiveForm('formDiv showForm');
        setBlur('blurLayer showLayer');
    };

    const handleConfirm = async (event) => {
        event.preventDefault();
        setShowResults(false)
        try {
            const response = await axios.post('/bookings/', {
                guest: user.id,
                room_name: selectedRoom,
                checkin_time: checkInTime,
                checkout_time: checkOutTime,
                date: startDate.toISOString().split('T')[0],
                deposit: deposit,
                full_payment: (deposit * 2)
            });

            if (response.data.message === "Success") {
                // Success
                setActiveForm('formDiv');
                setShowConfirmation(true);
                setConfirmationMessage("Thank you and just one last step, please deposit in 5 mins to finish your booking:");
                // EXAMPLE QR
                setQrCodeUrl('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=YourPaymentLinkHere');
            }
        } catch (error) {
            if (error.response) {
                // Server responsed an error
                console.log("all error data:");
                console.log(error.response.data);

                if (error.response.data.non_field_errors) {
                    console.log("non_field_errors:");
                    console.log(error.response.data.non_field_errors['0']);
                    // setAddClassStatus('Class already exists');
                } else if (error.response.data.guest) {
                    console.log("no guest message:");
                    console.log(error.response.data.guest);
                    // setAddClassStatus("Invalid Guest ID");
                } else if (error.response.data.room_name) {
                    console.log("no room name message:");
                    console.log(error.response.data.room_name);
                    // setAddClassStatus("Invalid Room Name");
                }
            } else if (error.request) {
                // Request sent but no response
                console.log(error.request);
            } else {
                // error init request
                console.log('Error', error.message);
            }
        }
    };

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
                {user !== null ? (
                    <form className="form flex" onSubmit={handleConfirm}>
                        <IoIosCloseCircle className='icon' onClick={removeForm} />
                        <div className="guestInfo flex">
                            <h2>Please check your booking's information below</h2>
                            <div className="bookingInfo flex">
                                <h2>Your Booking</h2>
                                <p>Guest: {user.username}</p>
                                <p>Room: {selectedRoom}</p>
                                <p>Date: {startDate.toDateString()}</p>
                                <p>Check In: {checkInTime}</p>
                                <p>Check Out: {checkOutTime}</p>
                                <p>Deposit: {deposit} VND</p>
                                <p>Full Payment: {deposit * 2} VND</p>
                            </div>
                        </div>

                        <button type='submit' className='btn'>
                            <span>Confirm</span>
                        </button>
                    </form>
                ) : (
                    <form className="form flex">
                        <IoIosCloseCircle className='icon' onClick={removeForm} />
                        <div className="guestInfo flex">
                            <div className="bookingInfo flex">
                                <h2>You have to login to use this feature</h2>
                            </div>
                        </div>
                    </form>
                )}


            </div>

            <div className={blur}></div>

            {showConfirmation && (
                <div className="confirmation flex flex-col justify-center items-center">
                    <IoIosCloseCircle className='icon' onClick={removeConfirmation} />
                    <h2>{confirmationMessage}</h2>
                    <img src={qrCodeUrl} alt="QR Code for Payment" />
                </div>
            )}
        </div>
    );
};

export default Search;
