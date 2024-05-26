import React, { useEffect, useState } from 'react';
import Axios from '../../../../../../../axiosConfig';

//IMPORTED IMAGES =============>
import room2 from '../../../../Assets_Admin/small_room.jpg'
import room1 from '../../../../Assets_Admin/large_room.jpg'

//IMPORTED ICONS ==============>
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [filterType, setFilterType] = useState('all');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        filterAndSortBookings();
    }, [sortConfig, filterType, filterValue, bookings]);

    const fetchBookings = () => {
        Axios.get('http://127.0.0.1:8000/bookings/')
            .then((response) => {
                setBookings(response.data);
                setFilteredBookings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filterAndSortBookings = () => {
        let filteredData = [...bookings];

        if (filterType !== 'all' && filterValue) {
            filteredData = filteredData.filter(booking => {
                return String(booking[filterType]).includes(filterValue);
            });
        }

        if (sortConfig !== null) {
            filteredData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredBookings(filteredData);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
        setFilterValue('');
    };

    const handleFilterValueChange = (e) => {
        setFilterValue(e.target.value);
    };

    return (
        <div className='  '>
            <div className='nextBooking sectionContainer'>
                <div className="heading">
                    <h1>Next Booking</h1>
                </div>

                <div className="secContainer grid">

                    <div className="singleItem flex">
                        <div className='imgCard flex'>
                            <img src={room1} />
                            <h3>Room 1</h3>
                        </div>
                        <div className='details flex'>
                            <h3>Current status:</h3>
                            <h3>Next use:</h3>
                        </div>
                    </div>

                    <div className="singleItem flex">
                        <div className='imgCard flex'>
                            <img src={room2} />
                            <h3>Room 2</h3>
                        </div>
                        <div className='details flex'>
                            <h3>Current status:</h3>
                            <h3>Next use:</h3>
                        </div>
                    </div>
                </div>

            </div>

            <div className='bookingList sectionContainer flex'>
                <div className="heading">
                    <h1>Booking List</h1>
                </div>

                <div className="filterDiv">
                    <label htmlFor="filterType">Filter By:</label>
                    <select id="filterType" value={filterType} onChange={handleFilterTypeChange}>
                        <option value="all">All Bookings</option>
                        <option value="guest">Guest ID</option>
                        <option value="room">Room ID</option>
                        <option value="date">Date</option>
                        <option value="status">Status</option>
                    </select>
                    {filterType !== 'all' && (
                        <input
                            type="text"
                            placeholder={`Enter ${filterType}`}
                            value={filterValue}
                            onChange={handleFilterValueChange}
                        />
                    )}
                </div>
                <div className="tableDiv flex">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')}>Booking ID</th>
                                <th onClick={() => handleSort('guest')}>Guest ID</th>
                                <th onClick={() => handleSort('room')}>Room ID</th>
                                <th onClick={() => handleSort('date')}>Date</th>
                                <th onClick={() => handleSort('checkin_time')}>Checkin</th>
                                <th onClick={() => handleSort('checkout_time')}>Checkout</th>
                                <th onClick={() => handleSort('status_name')}>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((bookingItem) => (
                                <tr key={bookingItem.id}>
                                    <td>{bookingItem.id}</td>
                                    <td>{bookingItem.guest}</td>
                                    <td>{bookingItem.room}</td>
                                    <td>{bookingItem.date}</td>
                                    <td>{bookingItem.checkin_time}</td>
                                    <td>{bookingItem.checkout_time}</td>
                                    <td>{bookingItem.status_name}</td>
                                    <td>
                                        <BsFillTrashFill className='icon' />
                                        <BsFillPencilFill className='icon' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="btn">Add Booking</button>
                </div>
            </div>

        </div>
    );
};

export default BookingList;