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
    Spinner,
    DateInput
} from "@nextui-org/react";
import axios from '../../../../../../../axiosConfig';
import { format } from 'date-fns';

const EditUserForm = ({ isOpen, onOpenChange, userId, fetchUsers }) => {
    const [userData, setUserData] = useState({
        username: '',
        full_name: '',
        email: '',
        contact_number: '',
        date_of_birth: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            axios.get(`/users/${userId}/`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleDateChange = (value) => {
        const formattedDate = format(new Date(value), 'yyyy-MM-dd');
        setUserData({ ...userData, date_of_birth: formattedDate });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.patch(`/users/${userId}/`, userData);

            if (response.status === 200) {
                alert("User updated successfully")
                fetchUsers();
                onOpenChange(false);
            } else {
                alert("Error updating user");
            }
        } catch (error) {
            alert("Error updating user");
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => { onOpenChange(open); }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div id="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Edit User
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Username"
                                name="username"
                                value={userData.username}
                                onChange={handleInputChange}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Full Name"
                                name="full_name"
                                value={userData.full_name}
                                onChange={handleInputChange}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Contact Number"
                                name="contact_number"
                                value={userData.contact_number}
                                onChange={handleInputChange}
                            />
                            <DateInput
                                fullWidth
                                label="Date of Birth"
                                // value={userData.date_of_birth}
                                onChange={handleDateChange}
                            />
                            <Select
                                fullWidth
                                label="Role"
                                placeholder="Select a role"
                                name="role"
                                value={userData.role}
                                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                            >
                                <SelectItem key="guest" value="guest">Guest</SelectItem>
                                <SelectItem key="instructor" value="instructor">Instructor</SelectItem>
                                <SelectItem key="staff" value="staff">Staff</SelectItem>
                            </Select>
                            <Spacer y={1} />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => onOpenChange(false)} disabled={loading}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmit} disabled={loading}>
                                {loading ? <Spinner color="white" size="sm" /> : 'Save Changes'}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditUserForm;