import React, { useState, useEffect } from 'react';
import {
    Modal,
    Button,
    Spacer,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
    User,
    Spinner
} from "@nextui-org/react";
import Combobox from 'react-widgets/Combobox';
import axios from '../../../../../../../axiosConfig';
import 'react-widgets/styles.css'; // Import styles for Combobox

const AddStudentForm = ({ isOpen, onOpenChange, fetchClasses, classId }) => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    const [allUsers, setAllUsers] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [existingStudents, setExistingStudents] = useState([]);

    // Fetch all users with role 'guest'
    useEffect(() => {
        axios.get(`/users/`)
            .then(response => {
                const guests = response.data.filter(user => user.role === 'guest');
                setAllUsers(guests);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    // Fetch existing students in the class
    useEffect(() => {
        if (isOpen) {
            axios.get(`/class/${classId}/`)
                .then(response => {
                    setExistingStudents(response.data.students.map(student => student.id));
                })
                .catch(error => {
                    console.error('Error fetching existing students:', error);
                });
        }
    }, [isOpen, classId]);

    // Custom filter function to handle filtering based on multiple fields
    const customFilter = (item, searchTerm) => {
        const search = searchTerm.toLowerCase();
        return (
            item.full_name?.toLowerCase().includes(search) ||
            item.username?.toLowerCase().includes(search) ||
            item.email?.toLowerCase().includes(search)
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        // Include existing student IDs and the new student ID
        const allStudentIds = [...existingStudents, selectedStudent.id];
        allStudentIds.forEach(id => formData.append('student_ids', id));
        try {
            const response = await axios.patch(`/class/${classId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setStatus("Student added successfully");
                fetchClasses();
                onOpenChange(false);
            } else {
                setStatus("Error adding student");
            }
        } catch (error) {
            setStatus("Error adding student");
            console.error("Error adding student:", error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSelectedStudent(null);
        setStatus('');
    };

    return (
        <Modal className='h-1/3' isOpen={isOpen} onOpenChange={(open) => { onOpenChange(open); if (!open) resetForm(); }}>
            <ModalContent>
                {(onClose) => {
                    if (!isOpen) resetForm();
                    return (
                        <>
                            <ModalHeader>
                                <div id="modal-title" className="text-xl font-bold">
                                    Add New Student
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <Combobox
                                    data={allUsers}
                                    textField="username"
                                    valueField="id"
                                    placeholder="Type to search a student"
                                    filter={customFilter}
                                    value={selectedStudent}
                                    onChange={value => setSelectedStudent(value)}
                                    busy={loading}
                                    autoFocus
                                    className="w-full border border-black-300 rounded-2xl p-2 mb-4"
                                    inputProps={{
                                        className: 'w-full border-none outline-none text-base p-2',
                                        placeholder: 'Search student by name, username, or email'
                                    }}
                                    listProps={{
                                        className: 'border border-gray-300 rounded-lg mt-1 p-2 max-h-60 overflow-auto shadow-lg'
                                    }}
                                    renderListItem={({ item }) => (
                                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                                            <User
                                                key={item.id}
                                                avatarProps={{ radius: "lg", src: item.avatar ? `${cloudinaryBaseUrl}/${item.avatar}` : '' }}
                                                name={item?.full_name || item.username}
                                                description={item.email}
                                                className="flex items-center gap-2"
                                            />
                                        </div>
                                    )}
                                />
                                {status && <div className="text-red-500">{status}</div>}
                                <Spacer y={1} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => onOpenChange(false)} disabled={loading}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSubmit} disabled={loading}>
                                    {loading ? <Spinner color="white" size="sm" /> : 'Add Student'}
                                </Button>
                            </ModalFooter>
                        </>
                    );
                }}
            </ModalContent>
        </Modal>
    );
};

export default AddStudentForm;