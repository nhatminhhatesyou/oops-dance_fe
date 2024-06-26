import React, { useState, useEffect } from 'react';
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

const EditScheduleForm = ({ isOpen, onOpenChange, fetchSchedule, scheduleId }) => {
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (scheduleId) {
            axios.get(`/schedule/${scheduleId}/`)
                .then((response) => {
                    const scheduleData = response.data;
                    setDayOfWeek(scheduleData.day_of_the_week);
                    setStartTime(scheduleData.start_time.slice(0, 5)); // Ensure only hh:mm format
                    setEndTime(scheduleData.end_time.slice(0, 5)); // Ensure only hh:mm format
                })
                .catch((error) => {
                    console.error("Error fetching schedule details:", error);
                });
        }
    }, [scheduleId]);

    const parseTime = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        return new Date(0, 0, 0, hours, minutes);
    }

    const handleSubmit = async () => {
        const startTimeObj = parseTime(startTime);
        const endTimeObj = parseTime(endTime);

        if (startTimeObj >= endTimeObj) {
            setStatus("End time must be after start time");
            return;
        }

        try {
            const response = await axios.patch(`/schedule/${scheduleId}/`, {
                day_of_the_week: dayOfWeek,
                start_time: startTime.length === 5 ? `${startTime}:00` : startTime,
                end_time: endTime.length === 5 ? `${endTime}:00` : endTime
            });

            if (response) {
                alert("Schedule updated successfully");
                fetchSchedule();
                onOpenChange(false);
            } else {
                setStatus("Error updating schedule");
            }
        } catch (error) {
            setStatus("Error updating schedule");
            console.error("Error updating schedule:", error);
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
                                Edit Schedule
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
                                Update Schedule
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditScheduleForm;