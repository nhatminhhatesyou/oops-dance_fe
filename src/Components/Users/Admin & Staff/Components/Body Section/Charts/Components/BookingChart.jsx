import React, { useEffect, useState } from 'react';
import axios from '../../../../../../../axiosConfig';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BookingStatusChart = () => {
    const [bookingData, setBookingData] = useState([]);
    const [roomData, setRoomData] = useState({
        Room1: { pending: 0, approved: 0, cancelled: 0, completed: 0 },
        Room2: { pending: 0, approved: 0, cancelled: 0, completed: 0 }
    });
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const fetchBookingData = async () => {
        try {
            const response = await axios.get(`/bookings/`);
            setBookingData(response.data);
        } catch (error) {
            console.error('Error fetching booking data:', error);
        }
    };

    useEffect(() => {
        fetchBookingData();
    }, []);

    useEffect(() => {
        const room1Bookings = { pending: 0, approved: 0, cancelled: 0, completed: 0 };
        const room2Bookings = { pending: 0, approved: 0, cancelled: 0, completed: 0 };

        const filteredData = bookingData.filter(record => {
            const recordDate = new Date(record.date);
            const recordMonth = recordDate.getMonth() + 1; // getMonth() is zero-based
            const recordYear = recordDate.getFullYear();

            return (
                (selectedMonth ? recordMonth === parseInt(selectedMonth) : true) &&
                (selectedYear ? recordYear === parseInt(selectedYear) : true)
            );
        });

        filteredData.forEach(booking => {
            if (booking.room_id === 1) {
                room1Bookings[booking.status_name] += 1;
            } else if (booking.room_id === 2) {
                room2Bookings[booking.status_name] += 1;
            }
        });

        setRoomData({
            Room1: room1Bookings,
            Room2: room2Bookings
        });
    }, [bookingData, selectedMonth, selectedYear]);

    const chartData = {
        labels: ['Room 1', 'Room 2'],
        datasets: [
            {
                label: 'Pending',
                data: [roomData.Room1.pending, roomData.Room2.pending],
                backgroundColor: 'rgba(224, 221, 39, 0.6)',
                borderColor: 'rgba(224, 221, 39, 1)',
                borderWidth: 1,
            },
            {
                label: 'Approved',
                data: [roomData.Room1.approved, roomData.Room2.approved],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Cancelled',
                data: [roomData.Room1.cancelled, roomData.Room2.cancelled],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Completed',
                data: [roomData.Room1.completed, roomData.Room2.completed],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
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
        <div className="booking-status-chart sectionContainer flex flex-col gap-4" style={{ margin: '0 auto' }}>
            <h2 className="text-3xl font-bold">Booking Status Chart</h2>
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
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Bookings by Room and Status',
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            beginAtZero: true,
                            stacked: true,
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

export default BookingStatusChart;