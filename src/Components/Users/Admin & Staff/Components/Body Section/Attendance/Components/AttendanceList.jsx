import React, { useEffect, useState } from 'react';
import axios from '../../../../../../../axiosConfig'
import TableTemplate from '../../../../../../Table/TableTemplate'
import { VerticalDotsIcon } from '../../../../../../Table/VerticalDotsIcon';
import {
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Select,
    SelectItem
} from "@nextui-org/react";

const AttendanceList = () => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isInstructorChangeModalOpen, setIsInstructorChangeModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [details, setDetails] = useState('');
    const [newInstructor, setNewInstructor] = useState('');
    const [instructors, setInstructors] = useState([]);

    const fetchInstructors = async () => {
        try {
            const response = await axios.get(`/instructor-list/`);
            setInstructors(response.data);
        } catch (error) {
            console.error('Error fetching instructors:', error);
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchAttendanceList = async () => {
        try {
            const response = await axios.get(`/attendance-list/`);
            setAttendanceList(response.data);
        } catch (error) {
            console.error('Error fetching attendance records:', error);
        }
    };

    useEffect(() => {
        fetchAttendanceList();
    }, []);

    const handleApprove = async (record) => {
        if (record.status === 'waiting' || record.status === 'cancelled') {
            try {
                await axios.patch(`/attendance/${record.id}/`, { status: 'completed' });
                alert('Success');
                fetchAttendanceList();
            } catch (error) {
                console.error('Error updating status:', error);
                alert('Error updating status');
            }
        } else {
            alert("Action can't be done");
        }
    };

    const handleCancel = async () => {
        try {
            await axios.patch(`/attendance/${selectedRecord.id}/`, { status: 'cancelled' });
            alert('Success');
            setIsCancelModalOpen(false);
            fetchAttendanceList();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating status');
        }
    };

    const handleAddDetails = async () => {
        try {
            await axios.patch(`/attendance/${selectedRecord.id}/`, { details });
            alert('Details added successfully');
            setIsDetailsModalOpen(false);
            fetchAttendanceList();
        } catch (error) {
            console.error('Error adding details:', error);
            alert('Error adding details');
        }
    };

    const handleChangeInstructor = async () => {
        try {
            await axios.patch(`/attendance/${selectedRecord.id}/`, { instructor_id: newInstructor });
            alert('Instructor changed successfully');
            setIsInstructorChangeModalOpen(false);
            fetchAttendanceList();
        } catch (error) {
            console.error('Error changing instructor:', error);
            alert('Error changing instructor');
        }
    };
    const handleCreateRecords = async () => {
        try {
            const response = await axios.get(`/update-instructor-attendance/`);
            if (response.data.messages === "Attendance already exists") {
                alert('Attendance Already Exists!');
            }
            else {
                alert('Attendance Records Created!');
                console.log('response', response.data);
                fetchAttendanceList();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating records');
        }
    };

    const renderActions = (item) => (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem onClick={() => handleApprove(item)}>Approve</DropdownItem>
                <DropdownItem onClick={() => { setSelectedRecord(item); setIsCancelModalOpen(true); }}>Cancel</DropdownItem>
                <DropdownItem onClick={() => { setSelectedRecord(item); setIsDetailsModalOpen(true); }}>Add Details</DropdownItem>
                {item.status === 'pending' && (
                    <DropdownItem onClick={() => { setSelectedRecord(item); setIsInstructorChangeModalOpen(true); }}>Change Instructor</DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );

    const INITIAL_VISIBLE_COLUMNS = ["date", "user", "class_name", "checkin_time", "checkout_time", "status", "actions", "checkin_proof", "checkout_proof", "details"];

    const attendanceColumns = [
        { name: "Date", uid: "date", allowsSorting: true },
        { name: "Instructor", uid: "user", allowsSorting: true },
        { name: "Class Name", uid: "class_name", allowsSorting: true },
        { name: "Checkin Time", uid: "checkin_time" },
        { name: "Checkin Proof", uid: "checkin_proof" },
        { name: "Checkout Time", uid: "checkout_time" },
        { name: "Checkout Proof", uid: "checkout_proof" },
        { name: "Status", uid: "status", allowsSorting: true },
        { name: "Details", uid: "details" },
        { name: "Actions", uid: "actions" },
    ];

    const statusOptions = [
        { uid: "pending", name: "pending" },
        { uid: "waiting", name: "Waiting" },
        { uid: "in_progress", name: "In_progress" },
        { uid: "cancelled", name: "Cancelled" },
        { uid: "completed", name: "Completed" },
    ];

    const formattedAttendanceList = attendanceList.map(record => {
        const instructor = instructors.find(inst => inst.id === record.instructor_id);
        return {
            id: record.id,
            date: record.date,
            user_id: record.instructor_id,
            username: instructor.username,
            user_email: instructor.email,
            user_avatar: instructor.avatar,
            class_name: record.class_instance_detail.class_name,
            checkin_time: record.checkin_time,
            checkout_time: record.checkout_time,
            checkin_proof: record.checkin_proof,
            checkout_proof: record.checkout_proof,
            status: record.status,
            details: record.details,
            actions: "Actions",
        };
    });

    return (
        <div className='attendanceAdmin flex'>
            <div className="flex flex-col gap-4 sectionContainer ">
                <div className="header flex flex-col gap-4">
                    <h1 className='text-3xl font-bold'>
                        All Records
                    </h1>
                    <div className='flex gap-4 items-center font-semibold'>
                        <h1>Create this week's attendance records </h1>
                        <Button onClick={() => handleCreateRecords()}>Create</Button>
                    </div>
                </div>

                <div className="tableDiv">
                    <TableTemplate
                        columns={attendanceColumns}
                        data={formattedAttendanceList}
                        statusOptions={statusOptions}
                        initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
                        renderActions={renderActions}
                        AddNewBtn_active="hidden"
                    />
                </div>
            </div>

            <Modal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>
                        Confirm Cancellation
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to cancel this record?
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={() => setIsCancelModalOpen(false)}>No</Button>
                        <Button onPress={handleCancel}>Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>
                        Add Details
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            fullWidth
                            label="Details"
                            placeholder="Enter details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={() => setIsDetailsModalOpen(false)}>Close</Button>
                        <Button onPress={handleAddDetails}>Add Details</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isInstructorChangeModalOpen} onClose={() => setIsInstructorChangeModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>
                        Change Instructor
                    </ModalHeader>
                    <ModalBody>
                        <Select
                            label="New Instructor"
                            placeholder="Select new instructor"
                            onChange={(e) => setNewInstructor(e.target.value)}
                            value={newInstructor}
                        >
                            {instructors.map((instructor) => (
                                <SelectItem key={instructor.id} value={instructor.id}>
                                    {instructor.username}
                                </SelectItem>
                            ))}
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={() => setIsInstructorChangeModalOpen(false)}>Close</Button>
                        <Button onPress={handleChangeInstructor}>Change Instructor</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AttendanceList