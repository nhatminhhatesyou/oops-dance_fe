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
import { Spinner } from "@nextui-org/spinner"; // Import Spinner

const CheckinForm = ({ isOpen, onOpenChange, classData, user, fetchAttendanceList, fetchTodayClasses }) => {
    const [className, setClassName] = useState('');
    const [roomID, setRoomID] = useState('');
    const [attendanceID, setAttendanceID] = useState('');
    const [checkInStatus, setcheckInStatus] = useState('');
    const [proof, setProof] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (classData) {
            setClassName(classData.class_instance_detail.class_name);
            setRoomID(classData.room_id);
            setAttendanceID(classData.id);
        }
    }, [classData]);

    const handleCheckIn = async () => {
        setLoading(true);
        const formData = new FormData();
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        formData.append('checkin_time', formattedTime);
        formData.append('status', "in_progress");

        if (proof) {
            formData.append('checkin_proof', proof);
        }

        try {
            await axios.patch(`/attendance/${attendanceID}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchAttendanceList();
            fetchTodayClasses();
            onOpenChange(false);
        } catch (error) {
            console.error("Error: ", error);
            alert("ERROR");
        } finally {
            setLoading(false); // Stop loading after the request is done
            alert("Checkin Success!");
        }
    };

    const handleImageChange = (e) => {
        setProof(e.target.files[0]);
        setFileName(e.target.files[0].name);
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
                        <div style={{ marginBottom: '16px' }}>
                            <Button
                                color="primary"
                                onPress={() => document.getElementById('proof').click()}
                            >
                                Upload Proof
                            </Button>
                            <input
                                type="file"
                                id="proof"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {fileName && <div style={{ marginTop: '10px' }}>{fileName}</div>}
                        </div>
                        <Spacer y={1} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onOpenChange(false)} disabled={loading}>
                            Close
                        </Button>
                        <Button color="primary" onPress={handleCheckIn} disabled={loading}>
                            {loading ? <Spinner color="white" size="sm" /> : 'Check In'}
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default CheckinForm;