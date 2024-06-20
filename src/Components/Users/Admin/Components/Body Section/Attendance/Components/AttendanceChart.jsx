import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from '../../../../../../../axiosConfig';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AttendanceChart = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [instructorList, setInstructorList] = useState([]);
    const [completedData, setCompletedData] = useState([]);
    const [cancelledData, setCancelledData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const fetchInstructors = async () => {
        try {
            const response = await axios.get(`/instructor-list/`);
            setInstructorList(response.data);
        } catch (error) {
            console.error('Error fetching instructors:', error);
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(`/attendance-list/`);
            const data = response.data;

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

            const instructorIds = filteredData.map(record => record.instructor_id);

            const uniqueInstructors = [...new Set(instructorIds)];

            const completedCounts = uniqueInstructors.map(instructorId => {
                const instructor = instructorList.find(inst => inst.id === instructorId);
                return filteredData.filter(record => record.instructor_id === instructor.id && record.status === 'completed').length;
            });

            const cancelledCounts = uniqueInstructors.map(instructorId => {
                const instructor = instructorList.find(inst => inst.id === instructorId);
                return filteredData.filter(record => record.instructor_id === instructor.id && record.status === 'cancelled').length;
            });

            const instructorUsernames = uniqueInstructors.map(instructorId => {
                const instructor = instructorList.find(inst => inst.id === instructorId);
                return instructor ? instructor.username : 'Unknown';
            });

            setLabels(instructorUsernames);
            setCompletedData(completedCounts);
            setCancelledData(cancelledCounts);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    useEffect(() => {
        fetchAttendanceData();
    }, [selectedMonth, selectedYear]);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Completed',
                data: completedData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Cancelled',
                data: cancelledData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
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

    return (
        <div className="attendance-chart sectionContainer">
            <h2 className="text-2xl font-bold">Instructor Attendance Chart</h2>
            <div className="flex gap-4 mb-4">
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
            <Bar
                data={chartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return Number.isInteger(value) ? value : null;
                                }
                            }
                        },
                    },
                }}
            />
        </div>
    );
};

export default AttendanceChart;