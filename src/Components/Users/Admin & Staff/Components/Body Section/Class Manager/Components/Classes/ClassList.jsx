import React, { useEffect, useState } from 'react'
import Axios from '../../../../../../../../axiosConfig';


//IMPORTED ICON ================>
import { VerticalDotsIcon } from '../../../../../../../Table/VerticalDotsIcon';

import TableTemplate from '../../../../../../../Table/TableTemplate';
import AddClassForm from './AddClassForm'
import EditClassForm from './EditClassForm';
import ChangeClassImageForm from './ChangeClassImageForm';

import {
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    useDisclosure
} from "@nextui-org/react";




const ClassList = () => {
    const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
    const { isOpen: isChangeImageOpen, onOpen: onChangeImageOpen, onOpenChange: onChangeImageOpenChange } = useDisclosure();

    const [selectedClassId, setSelectedClassId] = useState(null);

    //Class List
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = () => {
        Axios.get('/class-list/')
            .then((response) => {
                setClasses(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //Instructor List
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = () => {
        Axios.get('/instructor-list/')
            .then((response) => {
                setInstructors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //Schedule List
    const [scheduleList, setScheduleList] = useState([]);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = () => {
        Axios.get('/schedule-list/')
            .then((response) => {
                setScheduleList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };



    //Change Class's IMG
    const handleChangeImage = (classId) => {
        setSelectedClassId(classId);
        onChangeImageOpen();
    };

    //Edit class
    const handleEditClass = (classId) => {
        setSelectedClassId(classId);
        onEditOpen();
    };

    //Delete  =======>
    const handleDeleteClass = (classId) => {
        Axios.delete(`/class/${classId}/`)
            .then((response) => {
                alert("Lớp học đã được xóa.");
                console.log("Lớp học đã được xóa.")
                fetchClasses();
            })
            .catch((error) => {
                console.error("Có lỗi: ", error);
                console.log("Có lỗi xảy ra khi xóa lớp học.")
                alert("Có lỗi xảy ra khi xóa lớp học.");
            });
    };

    //TABLE DEPENDENCIES
    const INITIAL_VISIBLE_COLUMNS = ["class_id", "class", "class_lesson", "room", "instructor", "schedule", "price", "actions"];

    const attendanceColumns = [
        { name: "Class ID", uid: "id", allowsSorting: true },
        { name: "Class", uid: "class", allowsSorting: true },
        { name: "Lesson", uid: "class_lesson", allowsSorting: true },
        { name: "Room", uid: "room", allowsSorting: true },
        { name: "Instructor", uid: "instructor", allowsSorting: true },
        { name: "Schedule", uid: "schedule", allowsSorting: true },
        { name: "Price", uid: "price", allowsSorting: true },
        { name: "Actions", uid: "actions" },
    ];

    const formatSchedule = (schedules) => {
        return schedules.map((schedule, index) => (
            <div key={index}>
                {`${schedule.day_of_the_week_value} from ${schedule.start_time} to ${schedule.end_time}`}
            </div>
        ));
    };

    const formattedClassList = classes.map(record => ({
        id: record.id,
        class: record.class_name,
        instructor_id: record.instructor_detail.id,
        instructor_name: record.instructor_detail.username,
        instructor_email: record.instructor_detail.email,
        instructor_avatar: record.instructor_detail.avatar,
        class_lesson: record.class_lesson,
        class_img: record.image,
        room_id: record.room_detail.id,
        room: record.room_detail.name,
        schedule: formatSchedule(record.schedules),
        schedule_original: record.schedules,
        price: record.price,
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
                <DropdownItem onClick={() => handleEditClass(item.id)}>Edit Class's Information</DropdownItem>
                <DropdownItem onClick={() => handleChangeImage(item.id)}>Change Class's Image</DropdownItem>
                <DropdownItem onClick={() => handleDeleteClass(item.id)}>Delete Class</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

    return (
        <div className='classListDiv sectionContainer'>
            <div className="header">
                <h2>Classes</h2>
            </div>
            <div >
                <TableTemplate
                    columns={attendanceColumns}
                    data={formattedClassList}
                    initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
                    renderActions={renderActions}
                    onAddNew={onAddOpen}
                    StatusBtn_active="hidden"
                />
                <AddClassForm
                    isOpen={isAddOpen}
                    onOpenChange={onAddOpenChange}
                    fetchClasses={fetchClasses}
                    instructors={instructors}
                    schedules={scheduleList}
                />
                <EditClassForm
                    isOpen={isEditOpen}
                    onOpenChange={onEditOpenChange}
                    fetchClasses={fetchClasses}
                    classId={selectedClassId}
                    instructors={instructors}
                    schedules={scheduleList}
                />
                <ChangeClassImageForm
                    isOpen={isChangeImageOpen}
                    onOpenChange={onChangeImageOpenChange}
                    fetchClasses={fetchClasses}
                    classId={selectedClassId}
                />
            </div>
        </div>
    )
}

export default ClassList