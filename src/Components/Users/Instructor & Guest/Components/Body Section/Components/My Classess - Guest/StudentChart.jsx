import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import SmallTableTemplate from '../../../../../../SmallTable/SmallTableTemplate';
import TableTemplate from '../../../../../../Table/TableTemplate';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from '../../../../../../../axiosConfig';

// Register Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const StudentAttendancePieChart = ({ studentId }) => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [attendCount, setAttendCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(`/student-attendance-records/${studentId}/`);
            const data = response.data;
            setAttendanceData(data);
            // Filter data by selected month and year
            const filteredData = data.filter(record => {
                const recordDate = new Date(record.date);
                const recordMonth = recordDate.getMonth() + 1; // getMonth() is zero-based
                const recordYear = recordDate.getFullYear();

                return (
                    (selectedMonth ? recordMonth === parseInt(selectedMonth) : true) &&
                    (selectedYear ? recordYear === parseInt(selectedYear) : true)
                );
            });

            const attendCount = filteredData.filter(record => record.status === 'attend').length;
            const absentCount = filteredData.filter(record => record.status === 'absent').length;

            setAttendCount(attendCount);
            setAbsentCount(absentCount);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    useEffect(() => {
        fetchAttendanceData();
    }, [selectedMonth, selectedYear]);

    const chartData = {
        labels: ['Attend', 'Absent'],
        datasets: [
            {
                data: [attendCount, absentCount],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const years = Array.from({ length: 10 }, (_, index) => {
        const year = new Date().getFullYear() - index;
        return { value: year.toString(), label: year.toString() };
    });


    //Table dependencies
    const INITIAL_VISIBLE_COLUMNS = ["date", "class", "status", "details"];
    const statusOptions = [
        { uid: "absent", name: "Absent" },
        { uid: "attend", name: "Attend" }
    ];

    return (
        <div >
            <div className="attendance-chart flex flex-col gap-4 items-center">
                <h2 className="text-4xl font-bold">Your Attendance Details</h2>


                <div className='flex justify-between items-center gap-20'>
                    <div className='chartDiv'>
                        <div className="flex gap-4 mb-4 justify-center">
                            <select
                                className="p-2 border rounded"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            >
                                <option value="">Select Month</option>
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>{month.label}</option>
                                ))}
                            </select>
                            <select
                                className="p-2 border rounded"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                            >
                                <option value="">Select Year</option>
                                {years.map((year) => (
                                    <option key={year.value} value={year.value}>{year.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className=''>
                            <Pie
                                data={chartData}
                            />
                        </div>
                    </div>

                    <div className="tableDiv">

                        <TableTemplate
                            data={
                                attendanceData.map((item) => ({
                                    id: item.id,
                                    date: item.date,
                                    class_name: item.class_instance.class_name,
                                    class_img: item.class_instance.image,
                                    status: item.status,
                                    details: item.details
                                }))
                            }
                            columns={[
                                { name: "Date", uid: "date" },
                                { name: "Class", uid: "class" },
                                { name: "Status", uid: "status" },
                                { name: "Details", uid: "details" },
                            ]}
                            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
                            AddNewBtn_active="hidden"
                            statusOptions={statusOptions}
                        />

                    </div>

                </div>


            </div>

        </div>
    );
};

export default StudentAttendancePieChart;