import React, { useEffect, useState } from 'react';
import './Attendance.css'
import axios from '../../../../../../axiosConfig'
import TableTemplate from '../../../../../Table/TableTemplate'
import { VerticalDotsIcon } from '../../../../../Table/VerticalDotsIcon';
import {
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";

const Attendance = () => {


    //FETCH ATTENDANCE RECORD BY INSTRUCTOR
    const [attendanceList, setAttendanceList] = useState([])

    const fetchAttendanceList = async () => {
        try {
            const response = await axios.get(`/attendance-list/`);
            setAttendanceList(response.data)
        } catch (error) {
            console.error('Error fetching attendance records:', error)
        }
    }
    useEffect(() => {
        fetchAttendanceList();
    }, []);

    //TABLE DEPENDANCIES
    const INITIAL_VISIBLE_COLUMNS = ["date", "user", "class_name", "checkin_time", "checkout_time", "status", "actions"];

    const attendanceColumns = [
        { name: "Date", uid: "date", allowsSorting: true },
        { name: "Instructor", uid: "user", allowsSorting: true },
        { name: "Class Name", uid: "class_name", allowsSorting: true },
        { name: "Checkin Time", uid: "checkin_time", allowsSorting: true },
        { name: "Checkout Time", uid: "checkout_time", allowsSorting: true },
        { name: "Status", uid: "status", allowsSorting: true },
        { name: "Actions", uid: "actions" },
    ];

    const statusOptions = [
        { uid: "pending", name: "pending" },
        { uid: "waiting", name: "Waiting" },
        { uid: "in_progress", name: "In_progress" },
        { uid: "cancelled", name: "Cancelled" },
    ];

    const formattedAttendanceList = attendanceList.map(record => ({
        id: record.id,
        date: record.date,
        username: record.class_instance_detail.instructor_detail.username,
        user_email: record.class_instance_detail.instructor_detail.email,
        user_avatar: record.class_instance_detail.instructor_detail.avatar,
        class_name: record.class_instance_detail.class_name,
        checkin_time: record.checkin_time,
        checkout_time: record.checkout_time,
        status: record.status,
        actions: "Actions",
    }));

    const renderActions = (item) => (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem>Approve</DropdownItem>
                <DropdownItem>Cancel</DropdownItem>
                <DropdownItem>Add Details</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

    return (
        <div className='attendanceAdmin flex'>
            <div className="waitingAttendanceRecords sectionContainer flex">
                <div className="heading">
                    <h1>Waiting Records</h1>
                </div>
                <div className='tableDiv flex'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Class Name</th>
                                <th>Date</th>
                                <th>Checkin Time</th>
                                <th>Checkout Time</th>
                                <th>Instructor ID</th>
                                <th>Instructor name</th>
                                <th>Room ID</th>
                                <th>Proof</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceList
                                .filter(attendanceItem => attendanceItem.status === 'waiting')
                                .map((attendanceItem) => (
                                    <tr key={attendanceItem.id}>
                                        <td>{attendanceItem.id}</td>
                                        <td>{attendanceItem.class_instance_detail.class_name}</td>
                                        <td>{attendanceItem.date}</td>
                                        <td>{attendanceItem.checkin_time}</td>
                                        <td>{attendanceItem.checkout_time}</td>
                                        <td>{attendanceItem.instructor_id}</td>
                                        <td>{attendanceItem.instructor_detail.username}</td>
                                        <td>{attendanceItem.room_id}</td>
                                        <td>{attendanceItem.proof}</td>
                                        <td>{attendanceItem.status}</td>
                                        <td>
                                            <button className='btn'>Approve</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="allAttendanceRecords sectionContainer flex">
                <div className="heading">
                    <h1>All Records</h1>
                </div>
                <div className='tableDiv flex'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Class Name</th>
                                <th>Date</th>
                                <th>Checkin Time</th>
                                <th>Checkout Time</th>
                                <th>Instructor ID</th>
                                <th>Instructor name</th>
                                <th>Room ID</th>
                                <th>Proof</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceList
                                .map((attendanceItem) => (
                                    <tr key={attendanceItem.id}>
                                        <td>{attendanceItem.id}</td>
                                        <td>{attendanceItem.class_instance_detail.class_name}</td>
                                        <td>{attendanceItem.date}</td>
                                        <td>{attendanceItem.checkin_time}</td>
                                        <td>{attendanceItem.checkout_time}</td>
                                        <td>{attendanceItem.instructor_id}</td>
                                        <td>{attendanceItem.instructor_detail.username}</td>
                                        <td>{attendanceItem.room_id}</td>
                                        <td>{attendanceItem.proof}</td>
                                        <td>{attendanceItem.status}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="test sectionContainer">
                <TableTemplate
                    columns={attendanceColumns}
                    data={formattedAttendanceList}
                    statusOptions={statusOptions}
                    initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
                    renderActions={renderActions}
                />

            </div>
        </div>
    )
}

export default Attendance