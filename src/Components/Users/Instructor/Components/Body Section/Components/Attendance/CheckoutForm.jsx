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

const CheckoutForm = ({ isOpen, onOpenChange, classData, user, fetchAttendanceList, fetchTodayClasses }) => {
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

    const handleCheckOut = async () => {
        setLoading(true); // Set loading to true when the form submission starts
        const formData = new FormData();

        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        formData.append('checkout_time', formattedTime);
        formData.append('status', "waiting");

        if (proof) {
            formData.append('checkout_proof', proof);
        }

        try {
            await axios.patch(`/attendance/${attendanceID}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert("Checkout Success!");
            fetchAttendanceList();
            fetchTodayClasses();
            onOpenChange(false);
        } catch (error) {
            console.error("Error: ", error);
            alert("ERROR");
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
                            Check Out
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
                                Upload Image
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
                        <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
                            Close
                        </Button>
                        <Button color="primary" onPress={handleCheckOut}>
                            Check Out
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default CheckoutForm;