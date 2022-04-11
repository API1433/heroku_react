import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getTotalAtd } from "../../../services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const Attendancestats = () => {

    // State to store Attendance Data
    const [attendance, setAttendance] = useState();

    useEffect(() => {
        getAttendanceData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAttendanceData = async () => {
        await getTotalAtd().then((res) => {
            let presentPer = (res.data[0][0].PresentStudents * 100) / res.data[1][0].TotalStudents;
            setAttendance(presentPer);
        }).catch((err) => {
            console.log("error", err);
        })
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Attendance Record',
                font: {
                    size: 16,

                }

            },
        },
    };

    const labels = ['Present', 'Absent']
    const data = {
        labels,
        datasets: [
            {
                label: 'Users',
                data: [
                    attendance,
                    100 - attendance,
                ],
                backgroundColor: [

                    'rgba(2, 181, 30, 0.8)',
                    'rgba(237, 16, 9, 0.8)',
                ],

                borderWidth: 2,
            },
        ]
    }
    return (
        <>
            <Pie
                className="Bar"
                options={options}
                data={data}
            />
        </>
    );
}

export default Attendancestats;