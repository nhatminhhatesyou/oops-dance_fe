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
} from "@nextui-org/react";
import axios from '../../../../../../../axiosConfig';

const CheckinForm = ({ isOpen, onOpenChange, classData, user, fetchAttendanceList, fetchTodayClasses }) => {
    const [className, setClassName] = useState('');
    const [roomID, setRoomID] = useState('');
    const [attendanceID, setAttendanceID] = useState('');
    const [checkInStatus, setcheckInStatus] = useState('');

    useEffect(() => {
        if (classData) {
            setClassName(classData.class_instance_detail.class_name);
            setRoomID(classData.room_id);
            setAttendanceID(classData.id);
        }
    }, [classData]);

    const handleCheckIn = async () => {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        try {
            await axios.patch(`/attendance/${attendanceID}/`, {
                checkin_time: formattedTime,
                status: "in_progress"
            });
            alert("Checkin Success!");
            fetchAttendanceList();
            fetchTodayClasses();
            onOpenChange(false);
        } catch (error) {
            console.error("Error: ", error);
            alert("ERROR");
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <>
                    <ModalHeader>
                        <div id="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            Check In
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="inputDiv">
                            <p>Class Name: {className}</p>
                        </div>
                        <div className="inputDiv">
                            <p>Instructor: {user.username}</p>
                        </div>
                        <div className="inputDiv">
                            <p>Room: {roomID}</p>
                        </div>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            type="file"
                            id='proof'
                        />
                        <Spacer y={1} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
                            Close
                        </Button>
                        <Button color="primary" onPress={handleCheckIn}>
                            Check In
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default CheckinForm;