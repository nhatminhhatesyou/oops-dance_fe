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
    SelectItem,
    User,
} from "@nextui-org/react";
import axios from '../../../../../../../../axiosConfig';
import { Spinner } from "@nextui-org/spinner"; // Import the Spinner component

const AddClassForm = ({ isOpen, onOpenChange, fetchClasses, instructors, schedules }) => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';


    const [className, setClassName] = useState('');
    const [instructorID, setInstructor] = useState('');
    const [scheduleID, setScheduleID] = useState([]);
    const [price, setPrice] = useState('');
    const [roomID, setRoomID] = useState('');
    const [lesson, setLesson] = useState('');
    const [status, setStatus] = useState('');
    const [classImage, setClassImage] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true); // Set loading to true when the form submission starts
        const formData = new FormData();
        formData.append('class_name', className);
        formData.append('instructor_id', instructorID);
        formData.append('price', price);
        formData.append('room_id', roomID);
        formData.append('class_lesson', lesson);
        if (classImage) {
            formData.append('image', classImage);
        }

        scheduleID.forEach((id, index) => {
            formData.append(`schedules_ids[${index}]`, id);
        });

        try {
            const response = await axios.post('/add_class/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.message === "Success") {
                setStatus("Class added successfully");
                fetchClasses();
                onOpenChange(false);
            } else {
                setStatus("Error adding class");
            }
        } catch (error) {
            setStatus("Error adding class");
            console.error("Error adding class:", error);
        } finally {
            setLoading(false); // Set loading to false when the form submission is complete
        }
    };

    // Define a resetForm function
    const resetForm = () => {
        setClassName('');
        setInstructor('');
        setScheduleID([]);
        setPrice('');
        setRoomID('');
        setLesson('');
        setStatus('');
        setClassImage(null);
        setFileName('');
    };

    const handleImageChange = (e) => {
        setClassImage(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => { onOpenChange(open); if (!open) resetForm(); }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div id="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Add New Class
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Class Name"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                            />
                            <Select
                                fullWidth
                                label="Instructor"
                                placeholder="Select an instructor"
                                value={instructorID}
                                onChange={(e) => setInstructor(e.target.value)}
                            >
                                {instructors && instructors.length > 0 ? instructors.map(item => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.id}
                                        startContent={
                                            <User
                                                avatarProps={{ radius: "lg", src: `${cloudinaryBaseUrl}/${item.avatar}` }}
                                            >
                                            </User>
                                        }
                                    >
                                        {item.username}
                                    </SelectItem>
                                )) : <SelectItem disabled>No instructors available</SelectItem>}
                            </Select>
                            <Select
                                fullWidth
                                label="Schedule"
                                selectionMode='multiple'
                                placeholder="Select a schedule"
                                selectedKeys={scheduleID}
                                value={scheduleID}
                                onSelectionChange={setScheduleID}
                            >
                                {schedules && schedules.length > 0 ? schedules.map(item => {
                                    const holder = `${item.day_of_the_week_value} from ${item.start_time} to ${item.end_time}`;
                                    return (
                                        <SelectItem
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {holder}
                                        </SelectItem>
                                    );
                                }) : <SelectItem disabled>No schedules available</SelectItem>}
                            </Select>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Room ID"
                                value={roomID}
                                onChange={(e) => setRoomID(e.target.value)}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Class Lesson"
                                value={lesson}
                                onChange={(e) => setLesson(e.target.value)}
                            />
                            <Spacer y={1} />
                            <div style={{ marginBottom: '16px' }}>
                                <Button
                                    color="primary"
                                    onPress={() => document.getElementById('classImage').click()}
                                >
                                    Upload Image
                                </Button>
                                <input
                                    type="file"
                                    id="classImage"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {fileName && <div style={{ marginTop: '10px' }}>{fileName}</div>}
                            </div>
                            {status && <div style={{ color: 'red' }}>{status}</div>}
                            <Spacer y={1} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => onOpenChange(false)} disabled={loading}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmit} disabled={loading}>
                                {loading ? <Spinner color="white" size="sm" /> : 'Add Class'}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    );
};

export default AddClassForm;