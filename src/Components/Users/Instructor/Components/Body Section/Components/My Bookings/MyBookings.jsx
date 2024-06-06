import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../../AuthContext'
import axios from '../../../../../../../axiosConfig'
import './MyBookings.css'

//IMPORTED ICONS ==============>
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

const MyBookings = () => {
    const { user } = useAuth();
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
        axios.get(`/bookings/?guest_id=${user.id}`)
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
        <div className='myBookings'>
            <div className="listing sectionContainer flex">
                <div className='heading'>
                    <h1>Unpaid Deposits</h1>
                </div>
                <div className="filterDiv">
                    <label htmlFor="filterType">Filter By:</label>
                    <select id="filterType" value={filterType} onChange={handleFilterTypeChange}>
                        <option value="all">All Bookings</option>
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
                                <th onClick={() => handleSort('room')}>Room</th>
                                <th onClick={() => handleSort('date')}>Date</th>
                                <th onClick={() => handleSort('checkin_time')}>Checkin</th>
                                <th onClick={() => handleSort('checkout_time')}>Checkout</th>
                                <th onClick={() => handleSort('deposite')}>Deposite</th>
                                <th onClick={() => handleSort('deposite_status')}>Deposite Status</th>
                                <th onClick={() => handleSort('bank_transfer')}>Bank Transfer</th>
                                <th onClick={() => handleSort('cash')}>Cash</th>
                                <th onClick={() => handleSort('status_name')}>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.filter(booking => booking.deposite_status === 'waiting').map((bookingItem) => (
                                <tr key={bookingItem.id}>
                                    <td>{bookingItem.id}</td>
                                    <td>{bookingItem.guest}</td>
                                    <td>{bookingItem.room}</td>
                                    <td>{bookingItem.date}</td>
                                    <td>{bookingItem.checkin_time}</td>
                                    <td>{bookingItem.checkout_time}</td>
                                    <td>{bookingItem.deposite}</td>
                                    <td>{bookingItem.deposite_status}</td>
                                    <td>{bookingItem.bank_transfer}</td>
                                    <td>{bookingItem.cash}</td>
                                    <td>{bookingItem.status_name}</td>
                                    <td>
                                        <button className='btn'>Finish Your Payment</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="listing sectionContainer flex">
                <div className='heading'>
                    <h1>All Bookings</h1>
                </div>
                <div className="filterDiv">
                    <label htmlFor="filterType">Filter By:</label>
                    <select id="filterType" value={filterType} onChange={handleFilterTypeChange}>
                        <option value="all">All Bookings</option>
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
                                <th onClick={() => handleSort('room')}>Room</th>
                                <th onClick={() => handleSort('date')}>Date</th>
                                <th onClick={() => handleSort('checkin_time')}>Checkin</th>
                                <th onClick={() => handleSort('checkout_time')}>Checkout</th>
                                <th onClick={() => handleSort('deposite')}>Deposite</th>
                                <th onClick={() => handleSort('deposite_status')}>Deposite Status</th>
                                <th onClick={() => handleSort('bank_transfer')}>Bank Transfer</th>
                                <th onClick={() => handleSort('cash')}>Cash</th>
                                <th onClick={() => handleSort('status_name')}>Status</th>
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
                                    <td>{bookingItem.deposite}</td>
                                    <td>{bookingItem.deposite_status}</td>
                                    <td>{bookingItem.bank_transfer}</td>
                                    <td>{bookingItem.cash}</td>
                                    <td>{bookingItem.status_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default MyBookings