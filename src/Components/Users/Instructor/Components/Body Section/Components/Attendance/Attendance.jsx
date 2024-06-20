import React, { useEffect, useState } from 'react';
import './attendance.css'
import { useAuth } from '../../../../../../../AuthContext'
import axios from '../../../../../../../axiosConfig'
import { Link } from 'react-router-dom'
import { useDisclosure } from "@nextui-org/react"

// Imported templates
import TableTemplate from '../../../../../../Table/TableTemplate';
import CheckinForm from './CheckinForm';
import CheckoutForm from './CheckoutForm';

const Attendance = () => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    const { user } = useAuth();
    const [todayClasses_Instructor, setTodayClasses_Instructor] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);
    const [selectedClassData, setSelectedClassData] = useState(null);

    const { isOpen: isCheckinOpen, onOpenChange: onCheckinOpenChange } = useDisclosure();
    const { isOpen: isCheckoutOpen, onOpenChange: onCheckoutOpenChange } = useDisclosure();

    const fetchTodayClasses = async () => {
        try {
            const response = await axios.get(`/classes_today/${user.id}/`);
            setTodayClasses_Instructor(response.data);
        } catch (error) {
            console.error('Error fetching today\'s classes:', error);
        }
    };

    const fetchAttendanceList = async () => {
        try {
            const response = await axios.get(`/attendance-list/${user.id}`);
            setAttendanceList(response.data);
        } catch (error) {
            console.error('Error fetching attendance records:', error);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchTodayClasses();
            fetchAttendanceList();
        }
    }, [user]);

    const getTodaySchedule = (schedules) => {
        let todayDayOfWeek = (new Date().getDay() - 1);
        if (todayDayOfWeek < 0) {
            todayDayOfWeek = todayDayOfWeek + 7;
        }

        const todaySchedule = schedules.find(schedule => schedule.day_of_the_week === todayDayOfWeek.toString());
        return `${todaySchedule?.start_time} - ${todaySchedule?.end_time}`;
    };

    const columns = [
        { name: "ID", uid: "id" },
        { name: "Class Name", uid: "class_name" },
        { name: "Date", uid: "date", allowsSorting: true },
        { name: "Checkin Time", uid: "checkin_time" },
        { name: "Checkin Proof", uid: "checkin_proof" },
        { name: "Checkout Time", uid: "checkout_time" },
        { name: "Checkout Proof", uid: "checkout_proof" },
        { name: "Instructor ID", uid: "instructor_id" },
        { name: "Instructor Name", uid: "instructor_name" },
        { name: "Room ID", uid: "room_id" },
        { name: "Status", uid: "status" },
        { name: "Details", uid: "details" },
    ];

    const statusOptions = [
        { uid: "pending", name: "pending" },
        { uid: "waiting", name: "Waiting" },
        { uid: "in_progress", name: "In_progress" },
        { uid: "cancelled", name: "Cancelled" },
        { uid: "completed", name: "Completed" },
    ];

    const formattedData = attendanceList.map((attendanceItem) => ({
        id: attendanceItem.id,
        class_name: attendanceItem.class_instance_detail.class_name,
        date: attendanceItem.date,
        checkin_time: attendanceItem.checkin_time,
        checkout_time: attendanceItem.checkout_time,
        instructor_id: attendanceItem.instructor_id,
        instructor_name: attendanceItem.instructor_detail.username,
        room_id: attendanceItem.room_id,
        checkin_proof: attendanceItem.checkin_proof,
        checkout_proof: attendanceItem.checkout_proof,
        status: attendanceItem.status,
        details: attendanceItem.details,
    }));

    const handleShowCheckinForm = (classData) => {
        setSelectedClassData(classData);
        onCheckinOpenChange(true);
    };

    const handleShowCheckoutForm = (classData) => {
        setSelectedClassData(classData);
        onCheckoutOpenChange(true);
    };

    return (
        <div className='attendance '>
            <div className="historyDiv sectionContainer">
                <div className="header">
                    <h2>Your Attendance Records</h2>
                </div>
                <div className='tableDiv'>
                    <TableTemplate
                        columns={columns}
                        data={formattedData}
                        statusOptions={statusOptions}
                        initialVisibleColumns={columns.map(col => col.uid)}
                        AddNewBtn_active="hidden"
                    />
                </div>
            </div>

            <div className="todayClassesDiv sectionContainer flex">
                <div className="heading">
                    <h1>Classes Today</h1>
                </div>

                {/* INSTRUCTOR'S TODAY-CLASSES */}
                <div className="singleItem flex cards">
                    <div className="heading1">
                        <h1>Your Classes Today</h1>
                    </div>

                    <div className="cards todaySchedule flex">
                        <div className="schedule">
                            {todayClasses_Instructor.length > 0 ? (
                                todayClasses_Instructor.map((classItem) => (
                                    <div key={classItem.id} className="singleCard flex">
                                        <Link to="/instructor/my-classes" className="classImg">
                                            <img src={`${cloudinaryBaseUrl}/${classItem.class_instance_detail.image}` || logo} alt="" />
                                        </Link>

                                        <div className="cardText">
                                            <span>
                                                {classItem.class_instance_detail.class_name} <br />
                                                {getTodaySchedule(classItem.class_instance_detail.schedules)}
                                            </span>
                                        </div>

                                        {classItem.status === "pending" ? (
                                            <button className="btn" onClick={() => handleShowCheckinForm(classItem)}>Check In Now</button>
                                        ) : classItem.status === "in_progress" ? (
                                            <button className="btn" onClick={() => handleShowCheckoutForm(classItem)}>Check Out Now</button>
                                        ) : <button className="btn" >Completed</button>}
                                    </div>
                                ))
                            ) : (
                                <h2>No class for today</h2>
                            )}
                        </div>
                    </div>
                </div>

                <div className="reportDiv cards flex">
                    <h2>Anything's wrong? Send a report</h2>
                    <button className='btn'>Make a report</button>
                </div>

            </div>

            <CheckinForm
                isOpen={isCheckinOpen}
                onOpenChange={onCheckinOpenChange}
                classData={selectedClassData}
                user={user}
                fetchAttendanceList={fetchAttendanceList}
                fetchTodayClasses={fetchTodayClasses}
            />

            <CheckoutForm
                isOpen={isCheckoutOpen}
                onOpenChange={onCheckoutOpenChange}
                classData={selectedClassData}
                user={user}
                fetchAttendanceList={fetchAttendanceList}
                fetchTodayClasses={fetchTodayClasses}
            />
        </div>
    )
}

export default Attendance