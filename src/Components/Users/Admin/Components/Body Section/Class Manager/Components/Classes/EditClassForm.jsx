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
    SelectItem,
    User,
} from "@nextui-org/react";
import axios from '../../../../../../../../axiosConfig';

const EditClassForm = ({ isOpen, onOpenChange, fetchClasses, classId, schedules, instructors }) => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';

    const [className, setClassName] = useState('');
    const [instructorID, setInstructor] = useState('');
    const [price, setPrice] = useState('');
    const [roomID, setRoomID] = useState('');
    const [lesson, setLesson] = useState('');
    const [status, setStatus] = useState('');
    const [scheduleID, setScheduleID] = useState([]);

    useEffect(() => {
        if (classId) {
            axios.get(`/class/${classId}/`)
                .then((response) => {
                    const classData = response.data;
                    setClassName(classData.class_name);
                    setInstructor(classData.instructor_id);
                    setPrice(classData.price);
                    setRoomID(classData.room_id);
                    setLesson(classData.class_lesson);
                })
                .catch((error) => {
                    console.error("Error fetching class details:", error);
                });
        }
    }, [classId]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('class_name', className);
        formData.append('instructor_id', instructorID);
        formData.append('price', price);
        formData.append('room_id', roomID);
        formData.append('class_lesson', lesson);

        scheduleID.forEach((id, index) => {
            formData.append(`schedules_ids[${index}]`, id);
        });


        try {
            const response = await axios.patch(`/class/${classId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response) {
                alert("Class updated successfully");
                fetchClasses();
                onOpenChange(false);
            }
            else {
                setStatus("Error updating class");
            }
        } catch (error) {
            setStatus("Error updating class");
            console.error("Error updating class:", error);
        }
    };

    const handleEditClass = async () => {
        const formData = new FormData();
        formData.append('class_name', className);
        formData.append('instructor_id', instructorID);
        formData.append('price', price);
        formData.append('room_id', roomID);
        formData.append('class_lesson', lesson);

        scheduleID.forEach(id => {
            formData.append('schedules_ids', id);
        });


        scheduleID.forEach((id, index) => {
            formData.append(`schedules_ids[${index}]`, id);
        });
        axios.patch(`/class/${classId}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                alert("Thông tin lớp học đã được cập nhật.");
                fetchClasses();
                onOpenChange(false);
            })
            .catch((error) => {
                console.error("Có lỗi: ", error);
                alert("Có lỗi xảy ra khi cập nhật thông tin lớp học.");
            });
    };

    const resetForm = () => {
        setClassName('');
        setInstructor('');
        setPrice('');
        setRoomID('');
        setLesson('');
        setStatus('');
        setScheduleID([]);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => { onOpenChange(open); if (!open) resetForm(); }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div id="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Edit Class
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Class Name"
                                placeholder="Class Name"
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
                                placeholder="Select schedules"
                                selectedKeys={scheduleID}
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
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Room ID"
                                placeholder="Room ID"
                                value={roomID}
                                onChange={(e) => setRoomID(e.target.value)}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Class Lesson"
                                placeholder="Class Lesson"
                                value={lesson}
                                onChange={(e) => setLesson(e.target.value)}
                            />
                            {status && <div style={{ color: 'red' }}>{status}</div>}
                            <Spacer y={1} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => { onClose(); resetForm(); }}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleEditClass}>
                                Update Class
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditClassForm;