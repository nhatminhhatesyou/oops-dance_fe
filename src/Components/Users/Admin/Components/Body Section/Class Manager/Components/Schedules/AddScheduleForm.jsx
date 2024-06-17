import React, { useState } from 'react';
import {
    Modal,
    Input,
    Button,
    Spacer,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
    Select,
    SelectItem
} from "@nextui-org/react";
import axios from '../../../../../../../../axiosConfig';

const AddScheduleForm = ({ isOpen, onOpenChange, fetchSchedule }) => {
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async () => {
        console.log(("start time", startTime));
        console.log(("end time", endTime));
        console.log(("day", dayOfWeek));

        if (startTime <= endTime) {
            setStatus("End time must be after start time");
            return;
        }

        try {
            const response = await axios.post('/add_schedule/', {
                day_of_the_week: dayOfWeek,
                start_time: startTime.length === 5 ? `${startTime}:00` : startTime,
                end_time: endTime.length === 5 ? `${endTime}:00` : endTime
            });

            if (response.data.message === "Success") {
                setStatus("Schedule added successfully");
                fetchSchedule();
                onOpenChange(false);
            } else {
                setStatus("Error adding schedule");
            }
        } catch (error) {
            setStatus("Error adding schedule");
            console.error("Error adding schedule:", error);
        }
    };

    const resetForm = () => {
        setDayOfWeek('');
        setStartTime('');
        setEndTime('');
        setStatus('');
    };

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const times = Array.from({ length: 27 }, (_, i) => `${8 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`);

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => { onOpenChange(open); if (!open) resetForm(); }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div id="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Add Schedule
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <Select
                                fullWidth
                                label="Day of the Week"
                                placeholder="Select day of the week"
                                value={dayOfWeek}
                                onChange={(e) => setDayOfWeek(e.target.value)}
                            >
                                {daysOfWeek.map((day, index) => (
                                    <SelectItem key={index} value={day}>
                                        {day}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                fullWidth
                                label="Start Time"
                                placeholder="Select start time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            >
                                {times.map((time) => (
                                    <SelectItem key={time} value={time}>
                                        {time}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                fullWidth
                                label="End Time"
                                placeholder="Select end time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            >
                                {times.map((time) => (
                                    <SelectItem key={time} value={time}>
                                        {time}
                                    </SelectItem>
                                ))}
                            </Select>
                            {status && <div style={{ color: 'red' }}>{status}</div>}
                            <Spacer y={1} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                Add Schedule
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddScheduleForm;