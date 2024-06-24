import React, { useEffect, useState } from 'react';
import Axios from '../../../../../../../../axiosConfig';
import TableTemplate from '../../../../../../../Table/TableTemplate';
import AddScheduleForm from './AddScheduleForm';
import EditScheduleForm from './EditScheduleForm';
import { DeleteIcon } from '../../../../../../../Table/DeleteIcon';
import { EditIcon } from '../../../../../../../Table/EditIcon';
import { useDisclosure, Tooltip } from '@nextui-org/react';

const Schedule = () => {
    const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);

    const [schedule, setSchedule] = useState([]);
    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = () => {
        Axios.get('/schedule-list/')
            .then((response) => {
                setSchedule(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDeleteSchedule = (scheduleId) => {
        Axios.delete(`/schedule/${scheduleId}/`)
            .then((response) => {
                alert("Schedule has been deleted.");
                fetchSchedule();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error deleting schedule.");
            });
    };

    const handleEditSchedule = (scheduleId) => {
        setSelectedScheduleId(scheduleId);
        onEditOpen();
    };

    const columns = [
        { name: "Schedule ID", uid: "id", allowsSorting: true },
        { name: "Day of the Week", uid: "day_of_the_week_value", allowsSorting: true },
        { name: "Start Time", uid: "start_time", allowsSorting: true },
        { name: "End Time", uid: "end_time", allowsSorting: true },
        { name: "Action", uid: "actions" },
    ];

    const formattedScheduleList = schedule.map(item => ({
        id: item.id,
        day_of_the_week_value: item.day_of_the_week_value,
        start_time: item.start_time,
        end_time: item.end_time,
        actions: (
            <div className="relative flex items-center justify-center gap-2">
                <Tooltip content="Edit Schedule">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleEditSchedule(item.id)}>
                        <EditIcon />
                    </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete Schedule">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDeleteSchedule(item.id)}>
                        <DeleteIcon />
                    </span>
                </Tooltip>
            </div>
        )
    }));

    return (
        <div className="classScheduleDiv sectionContainer">
            <div>
                <h2>Schedule</h2>
                <TableTemplate
                    columns={columns}
                    data={formattedScheduleList}
                    initialVisibleColumns={["id", "day_of_the_week_value", "start_time", "end_time", "actions"]}
                    onAddNew={onAddOpen}
                    StatusBtn_active="hidden"

                />
                <AddScheduleForm
                    isOpen={isAddOpen}
                    onOpenChange={onAddOpenChange}
                    fetchSchedule={fetchSchedule}
                />
                <EditScheduleForm
                    isOpen={isEditOpen}
                    onOpenChange={onEditOpenChange}
                    fetchSchedule={fetchSchedule}
                    scheduleId={selectedScheduleId}
                />
            </div>
        </div>
    );

}

export default Schedule;