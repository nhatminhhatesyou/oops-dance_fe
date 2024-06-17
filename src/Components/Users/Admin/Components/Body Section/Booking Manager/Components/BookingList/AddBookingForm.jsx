import React, { useState } from 'react';
import {
    Modal,
    Input,
    Button,
    Spacer,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent
} from "@nextui-org/react";
import axios from '../../../../../../../../axiosConfig';

const AddBookingForm = ({ isOpen, onOpenChange, fetchBookings }) => {
    const [guest, setGuest] = useState('');
    const [room, setRoom] = useState('');
    const [date, setDate] = useState('');
    const [checkinTime, setCheckinTime] = useState('');
    const [checkoutTime, setCheckoutTime] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/add_booking/', {
                guest,
                room,
                date,
                checkin_time: checkinTime,
                checkout_time: checkoutTime
            });

            if (response.data.message === "Success") {
                setStatus("Booking added successfully");
                fetchBookings();
                onOpenChange(false);
            } else {
                setStatus("Error adding booking");
            }
        } catch (error) {
            setStatus("Error adding booking");
            console.error("Error adding booking:", error);
        }
    };

    const resetForm = () => {
        setGuest('');
        setRoom('');
        setDate('');
        setCheckinTime('');
        setCheckoutTime('');
        setStatus('');
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => { onOpenChange(open); if (!open) resetForm(); }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div id="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Add Booking
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Guest ID"
                                placeholder="Guest ID"
                                value={guest}
                                onChange={(e) => setGuest(e.target.value)}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Room ID"
                                placeholder="Room ID"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Date"
                                placeholder="Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Checkin Time"
                                placeholder="Checkin Time"
                                value={checkinTime}
                                onChange={(e) => setCheckinTime(e.target.value)}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Checkout Time"
                                placeholder="Checkout Time"
                                value={checkoutTime}
                                onChange={(e) => setCheckoutTime(e.target.value)}
                            />
                            {status && <div style={{ color: 'red' }}>{status}</div>}
                            <Spacer y={1} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                Add Booking
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddBookingForm;