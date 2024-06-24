import React, { useEffect, useState } from 'react';
import axios from '../../../../../../../axiosConfig';
import { Select, SelectItem, useDisclosure, Tooltip } from "@nextui-org/react";

// Imported Template =====================>
import TableTemplate from '../../../../../../Table/TableTemplate';
import AddStudentForm from './AddStudentForm';
import { DeleteIcon } from '../../../../../../Table/DeleteIcon';

const StudentList = () => {
    const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    const fetClasses = () => {
        axios.get(`/class-list/`)
            .then((response) => {
                setClasses(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetClasses();
    }, []);

    const handleClassChange = (value) => {
        setSelectedClass(value);
        console.log("selected class:", value);
    };

    const [filteredClass, setFilteredClass] = useState([]);

    useEffect(() => {
        setFilteredClass(classes.filter((classItem) => classItem.id === parseInt(selectedClass)));
    }, [selectedClass, classes]);

    const INITIAL_VISIBLE_COLUMNS = ["no", "user", "contact", "dob", "actions"];

    const handleAddNew = (classId) => {
        onAddOpen();
    };

    const handleRemoveStudent = async (studentID) => {
        console.log(("current class:", selectedClass));
        try {
            const response = await axios.patch(`/class/${selectedClass}/remove_student/`, { student_id: studentID });

            if (response.status === 200) {
                alert('Student removed successfully');
                fetClasses();
            } else {
                alert('Error removing student');
            }
        } catch (error) {
            console.error('Error removing student:', error);
            alert('Error removing student');
        }
    };

    return (
        <div>
            <div className='myClasses sectionContainer flex flex-col gap-10'>
                <div className="heading uppercase text-3xl font-semibold text-center">
                    Class's Details
                </div>
                <div className='subHeading text-xl font-normal text-center'>
                    <h1>View class's details, add/remove students</h1>
                </div>
                <div className="selectContainer flex items-center">
                    <Select
                        aria-label="Select Class"
                        label="Class"
                        placeholder="Select Class"
                        value={selectedClass}
                        onChange={(e) => handleClassChange(e.target.value)}
                        clearable
                    >
                        {classes.map((classItem) => (
                            <SelectItem key={classItem.id} value={classItem.id}>
                                {classItem.class_name}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                {filteredClass.map((classItem) => (
                    <div key={classItem.id} className="singleItem flex">
                        <div className='classImgDiv flex'>
                            <div className="img">
                                <img src={`${cloudinaryBaseUrl}/${classItem?.image}`} alt="class" />
                            </div>
                            <h2>{classItem.class_name}</h2>
                        </div>
                        <div className="classDetails cards flex">
                            <div className="heading1">
                                <h2>DETAILS</h2>
                            </div>
                            <div className="singleContent flex">
                                <div className="heading2 font-semibold">
                                    <h3>Schedule</h3>
                                </div>
                                <div className="cards font-semibold">
                                    {classItem.schedules.map((schedule) => (
                                        <h3 key={schedule.id}>
                                            {schedule.day_of_the_week_value} : <p className='font-normal'>From {schedule.start_time} to {schedule.end_time}</p>
                                        </h3>
                                    ))}
                                </div>
                            </div>
                            <div className="singleContent flex">
                                <div className="heading2 font-semibold">
                                    <h3>Room</h3>
                                </div>
                                <div className="cards font-semibold">
                                    <h3>Room {classItem.room_id} - {classItem.room_detail.size}</h3>
                                </div>
                            </div>
                            <div className="singleContent flex">
                                <div className="heading2 font-semibold">
                                    <h3>Lesson's Detail</h3>
                                </div>
                                <div className="cards font-semibold">
                                    <h3>{classItem.class_lesson}</h3>
                                </div>
                            </div>
                            <div className="singleContent flex">
                                <div className="heading2 font-semibold">
                                    <h3>Class's members</h3>
                                </div>

                                <div className="studentTable cards">
                                    <TableTemplate
                                        data={
                                            classItem.students.map((student, index) => ({
                                                id: student.id,
                                                no: index + 1,
                                                name: student.full_name,
                                                username: student.username,
                                                avatar: student.avatar,
                                                studentId: student.id,
                                                contact: student.contact_number,
                                                dob: student.date_of_birth,
                                                email: student.email,
                                                actions: (
                                                    <div className="relative flex items-center justify-center gap-2">
                                                        <Tooltip color="danger" content="Remove Student">
                                                            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleRemoveStudent(student.id)}>
                                                                <DeleteIcon />
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
                                            { name: "Actions", uid: "actions" },
                                        ]}
                                        initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
                                        StatusBtn_active="hidden"
                                        onAddNew={() => handleAddNew(classItem.id)} // Pass the class id to handleAddNew
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AddStudentForm
                isOpen={isAddOpen}
                onOpenChange={onAddOpenChange}
                fetchClasses={fetClasses}
                classId={selectedClass}
            />
        </div>
    );
}

export default StudentList;