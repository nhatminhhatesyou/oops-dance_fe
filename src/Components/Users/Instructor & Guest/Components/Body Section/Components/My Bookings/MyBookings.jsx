import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../../AuthContext'
import axios from '../../../../../../../axiosConfig'
import './MyBookings.css'

//IMPORTED Template ==============>
import TableTemplate from '../../../../../../Table/TableTemplate';
import { VerticalDotsIcon } from '../../../../../../Table/VerticalDotsIcon';
import { Dropdown, DropdownItem, DropdownTrigger, Button, DropdownMenu } from "@nextui-org/react";


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



    //TABLE DEPENDENCIES ==========>
    const columns = [
        { name: "Booking ID", uid: "id" },
        { name: "Guest", uid: "guest" },
        { name: "Room", uid: "room" },
        { name: "Date", uid: "date", allowsSorting: true },
        { name: "Checkin", uid: "checkin_time" },
        { name: "Checkout", uid: "checkout_time" },
        { name: "Deposit", uid: "deposit" },
        { name: "Deposit Status", uid: "deposit_status", allowsSorting: true },
        { name: "Bank Transfer", uid: "bank_transfer" },
        { name: "Cash", uid: "cash" },
        { name: "Status", uid: "status", allowsSorting: true },
        { name: "Details", uid: "details" },
        { name: "Actions", uid: "actions" },
    ];
    const columns_all = [
        { name: "Booking ID", uid: "id" },
        { name: "Guest", uid: "guest" },
        { name: "Room", uid: "room" },
        { name: "Date", uid: "date", allowsSorting: true },
        { name: "Checkin", uid: "checkin_time" },
        { name: "Checkout", uid: "checkout_time" },
        { name: "Deposit", uid: "deposit" },
        { name: "Deposit Status", uid: "deposit_status", allowsSorting: true },
        { name: "Bank Transfer", uid: "bank_transfer" },
        { name: "Cash", uid: "cash" },
        { name: "Status", uid: "status", allowsSorting: true },
        { name: "Details", uid: "details" },
    ];

    const INITIAL_VISIBLE_COLUMNS = [
        "id",
        "guest",
        "room",
        "date",
        "checkin_time",
        "checkout_time",
        "deposit",
        "deposit_status",
        "bank_transfer",
        "cash",
        "status",
        "details",
        "actions"
    ];
    const INITIAL_VISIBLE_COLUMNS_ALL = [
        "id",
        "guest",
        "room",
        "date",
        "checkin_time",
        "checkout_time",
        "deposit",
        "deposit_status",
        "bank_transfer",
        "cash",
        "status",
        "details",
    ];


    const statusOptions = [
        { uid: "pending", name: "pending" },
        { uid: "waiting", name: "Waiting" },
        { uid: "in_progress", name: "In_progress" },
        { uid: "cancelled", name: "Cancelled" },
        { uid: "completed", name: "Completed" },
    ];

    const formattedBookingList = bookings.filter(booking => booking.deposit_status === 'waiting').map(record => ({
        id: record.id,
        guest_id: record.guest,
        guest_avatar: record.guest_detail.avatar,
        guest_email: record.guest_detail.email,
        guest_username: record.guest_detail.username,
        room: record.room_id,
        date: record.date,
        checkin_time: record.checkin_time,
        checkout_time: record.checkout_time,
        deposit: record.deposit,
        deposit_status: record.deposit_status,
        bank_transfer: record.bank_transfer,
        cash: record.cash,
        status: record.status_name,
        details: record.details,
        actions: "Actions",
    }));
    const formattedAllBookingList = bookings.map(record => ({
        id: record.id,
        guest_id: record.guest,
        guest_avatar: record.guest_detail.avatar,
        guest_email: record.guest_detail.email,
        guest_username: record.guest_detail.username,
        room: record.room_id,
        date: record.date,
        checkin_time: record.checkin_time,
        checkout_time: record.checkout_time,
        deposit: record.deposit,
        deposit_status: record.deposit_status,
        bank_transfer: record.bank_transfer,
        cash: record.cash,
        status: record.status_name,
        details: record.details,
        actions: "Actions",
    }));

    const renderActions = (item) => (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem >Finish Your Payment</DropdownItem>
                <DropdownItem >Cancel Bookings</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
    return (
        <div className='myBookings'>
            <div className="listing sectionContainer flex">
                <div className='header'>
                    <h1 className='font-bold text-3xl'>Unpaid Deposits</h1>
                </div>

                <TableTemplate
                    columns={columns}
                    data={formattedBookingList}
                    statusOptions={statusOptions}
                    initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
                    renderActions={renderActions}
                    AddNewBtn_active="hidden"
                />
            </div>

            <div className="listing sectionContainer flex">
                <div className='header'>
                    <h1 className='font-bold text-3xl'>All Bookings</h1>
                </div>

                <TableTemplate
                    columns={columns_all}
                    data={formattedAllBookingList}
                    statusOptions={statusOptions}
                    initialVisibleColumns={INITIAL_VISIBLE_COLUMNS_ALL}
                    AddNewBtn_active="hidden"
                />
            </div>
        </div>
    )
}

export default MyBookings