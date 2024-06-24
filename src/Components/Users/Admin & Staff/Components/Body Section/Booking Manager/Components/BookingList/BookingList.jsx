import React, { useEffect, useState } from 'react';
import Axios from '../../../../../../../../axiosConfig';
import { VerticalDotsIcon } from '../../../../../../../Table/VerticalDotsIcon';
import TableTemplate from '../../../../../../../Table/TableTemplate';
import AddBookingForm from './AddBookingForm';
import EditBookingForm from './EditBookingForm';
import { useDisclosure, Dropdown, DropdownItem, DropdownTrigger, Button, DropdownMenu } from "@nextui-org/react";

const BookingList = () => {
    const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        Axios.get('/bookings/')
            .then((response) => {
                setBookings(response.data);
                console.log(("Fetched Bookings:", response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };

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


    const statusOptions = [
        { uid: "pending", name: "pending" },
        { uid: "waiting", name: "Waiting" },
        { uid: "in_progress", name: "In_progress" },
        { uid: "cancelled", name: "Cancelled" },
        { uid: "completed", name: "Completed" },
    ];

    const formattedBookingList = bookings.map(record => ({
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
                <DropdownItem onClick={() => handleEditBooking(item.id)}>Edit Details</DropdownItem>
                <DropdownItem onClick={() => handleEditBooking(item.id)}>Edit Bank Trans</DropdownItem>
                <DropdownItem onClick={() => handleEditBooking(item.id)}>Edit Cash</DropdownItem>
                <DropdownItem onClick={() => handleEditBooking(item.id)}>Edit Booking</DropdownItem>
                <DropdownItem onClick={() => handleDeleteBooking(item.id)}>Delete Booking</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

    const handleEditBooking = (bookingId) => {
        setSelectedBookingId(bookingId);
        onEditOpen();
    };

    const handleDeleteBooking = (bookingId) => {
        Axios.delete(`/booking/${bookingId}/`)
            .then((response) => {
                alert("Booking deleted successfully.");
                fetchBookings();
            })
            .catch((error) => {
                console.error("Error deleting booking: ", error);
                alert("Error deleting booking.");
            });
    };

    return (
        <div>
            <div className="sectionContainer ">
                <div className='header'>
                    <h2>Booking List</h2>
                </div>
                <div >
                    <TableTemplate
                        columns={columns}
                        data={formattedBookingList}
                        statusOptions={statusOptions}
                        initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
                        renderActions={renderActions}
                        onAddNew={onAddOpen}
                    />
                    <AddBookingForm
                        isOpen={isAddOpen}
                        onOpenChange={onAddOpenChange}
                        fetchBookings={fetchBookings}
                    />
                    <EditBookingForm
                        isOpen={isEditOpen}
                        onOpenChange={onEditOpenChange}
                        fetchBookings={fetchBookings}
                        bookingId={selectedBookingId}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingList;