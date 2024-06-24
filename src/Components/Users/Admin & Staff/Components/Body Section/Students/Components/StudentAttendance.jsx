import React, { useEffect, useState } from 'react'
import axios from '../../../../../../../axiosConfig';
import { Tooltip, Button } from "@nextui-org/react";


// Imported Template =====================>
import TableTemplate from '../../../../../../Table/TableTemplate';
import { CheckIcon } from '../../../../../../Table/CheckIcon';
import { CrossIcon } from '../../../../../../Table/CrossIcon';

const StudentAttendance = () => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    const [attendanceList, setAttendanceList] = useState([]);

    const fetchTodayAttendance = () => {
        axios.get(`/today-student-attendance/`)
            .then((response) => {
                setAttendanceList(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchTodayAttendance();
    }, []);

    const groupByClass = (attendanceList) => {
        return attendanceList.reduce((result, item) => {
            // Find the class in the result array
            let classGroup = result.find(group => group.class_id === item.class_id);

            // If not found, create a new group
            if (!classGroup) {
                classGroup = {
                    class_id: item.class_id,
                    class_instance: {
                        class_name: item.class_instance.class_name,
                        image: item.class_instance.image
                    },
                    students: []
                };
                result.push(classGroup);
            }

            // Add the student to the class group
            classGroup.students.push({
                ...item.student,
                status: item.status,
                attendance_id: item.id
            });

            return result;
        }, []);
    };

    // Use the function to transform the attendanceList
    const groupedAttendance = groupByClass(attendanceList);

    useEffect(() => {
    }, [groupedAttendance])

    //Table dependencies
    const INITIAL_VISIBLE_COLUMNS = ["no", "user", "contact", "dob", "status", "actions"];
    const statusOptions = [
        { uid: "pending", name: "pending" },
        { uid: "absent", name: "Absent" },
        { uid: "attend", name: "Attend" }
    ];

    const handleStatusChange = (attendanceId, newStatus) => {
        axios.patch(`/student-attendance/${attendanceId}/`, { status: newStatus })
            .then((response) => {
                alert("Status updated!")
                fetchTodayAttendance(); // Refresh the attendance data to reflect the changes
            })
            .catch((error) => {
                console.error("Error updating status:", error);
            });
    };

    const handleCreateRecords = async () => {
        try {
            const response = await axios.get(`/update-student-attendance/`);
            alert('Attendance Records Created!');
            fetchTodayAttendance();
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating records');
        }
    };
    return (
        <div className='studentAttendance sectionContainer flex flex-col gap-10'>
            <div className="heading uppercase text-3xl font-semibold text-center">
                Student Attendance Today
            </div>
            <div className="button text-center">
                <Button onClick={() => handleCreateRecords()}>Create Record</Button>
            </div>
            <div className="cardsDiv flex flex-col gap-10">
                <div className='myClasses flex flex-col gap-10'>
                    {groupedAttendance.map((item) => (
                        <div key={item.class_id} className="singleItem sectionContainer flex gap-3">
                            <div className='classImgDiv flex'>
                                <div className="img">
                                    <img src={`${cloudinaryBaseUrl}/${item.class_instance.image}`} alt="class" />
                                </div>
                                <h2>{item.class_instance.class_name}</h2>
                            </div>
                            <div className="classDetails cards">
                                <div className="heading1">
                                    <h2>Student Attendance</h2>
                                </div>
                                <div className=" ">
                                    {item.students && (
                                        <TableTemplate
                                            data={
                                                item.students.map((student, index) => ({
                                                    id: student.id,
                                                    no: index + 1,
                                                    name: student.full_name,
                                                    username: student.username,
                                                    avatar: student.avatar,
                                                    studentId: student.id,
                                                    contact: student.contact_number,
                                                    dob: student.date_of_birth,
                                                    email: student.email,
                                                    status: student.status,
                                                    actions: (
                                                        <div className="relative flex items-center justify-center gap-2">
                                                            <Tooltip color="danger" content="Absent">
                                                                <span
                                                                    className="text-lg text-danger cursor-pointer active:opacity-50"
                                                                    onClick={() => handleStatusChange(student.attendance_id, 'absent')}
                                                                >
                                                                    <CrossIcon />
                                                                </span>
                                                            </Tooltip>
                                                            <Tooltip color="success" content="Attend">
                                                                <span
                                                                    className="text-lg text-green-500 cursor-pointer active:opacity-50"
                                                                    onClick={() => handleStatusChange(student.attendance_id, 'attend')}
                                                                >
                                                                    <CheckIcon />
                                                                </span>
                                                            </Tooltip>
                                                        </div>
                                                    )
                                                }))
                                            }
                                            columns={[
                                                { name: "No.", uid: "no" },
                                                { name: "Student", uid: "user" },
                                                { name: "Contact", uid: "contact" },
                                                { name: "DOB", uid: "dob" },
                                                { name: "Status", uid: "status" },
                                                { name: "Actions", uid: "actions" },
                                            ]}
                                            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
                                            statusOptions={statusOptions}
                                            AddNewBtn_active="hidden"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StudentAttendance