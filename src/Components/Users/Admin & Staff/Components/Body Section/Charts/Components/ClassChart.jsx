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

const ClassChart = () => {
    const [classData, setClassData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [studentCounts, setStudentCounts] = useState([]);

    const fetchClassData = async () => {
        try {
            const response = await axios.get(`/class-list/`);
            const data = response.data;

            const classNames = data.map(record => record.class_name);
            const studentNumbers = data.map(record => record.students.length);

            setLabels(classNames);
            setStudentCounts(studentNumbers);
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
    };

    useEffect(() => {
        fetchClassData();
    }, []);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Number of Students',
                data: studentCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="class-chart sectionContainer flex flex-col gap-4">
            <h2 className="text-3xl font-bold">Class Enrollment Chart Of This Month</h2>
            <div style={{ height: '500px' }}>
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
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </div>
    );
};

export default ClassChart;