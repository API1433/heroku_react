import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getStudentsPerBatch } from "../../../services/api";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Batchstats = () => {

    const [allData, setAllData] = useState();

    useEffect(() => {
        getAllData()
    }, []);


    const getAllData = async () => {
        getStudentsPerBatch().then((res) => {
            setAllData(res.data.data.row)
        })
    }

    let graphLabels = allData?.map((label) => label?.BatchName);

    let graphValues = allData?.map((label) => label?.TotalStudents);

    const options = {
        responsive: true,
        plugins: {
            legend: {

                display: false

            },
            title: {
                display: true,
                text: 'Batch Participation',
                font: {
                    size: 16,

                }

            },
        },
        scales: {
            y: {
                title: {
                    text: 'No. Of Participants',
                    display: true,
                },
                suggestedMin: 50,
                suggestedMax: 100
            },
            x: {
                title: {
                    text: 'Courses',
                    display: true

                },


            }


        }

    };

    const labels = graphLabels
    const data = {
        labels,

        datasets: [
            {

                data: graphValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)'
                ],
                borderWidth: 1,
            },
        ]
    }
    return (
        <>
            <Bar
                className="Bar"
                options={options}
                data={data}
            />


        </>
    );
}

export default Batchstats;