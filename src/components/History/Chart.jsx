import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {connect} from "react-redux";
import 'chartjs-adapter-moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({Stype, Sname, token}) => {

    const [dataS, setDataS] = useState([]);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sensor Data Evolution',
            },
        },
    };

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Sensor Data',
                data: [],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            },
        ],
    });

    useEffect(() => {
        fetchData();

        // Fetch data every 60 seconds
        const interval = setInterval(fetchData, 60000);

        return () => clearInterval(interval);
    }, [Stype, Sname, token]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://192.168.1.200:5000/api/${Stype}/data?name=${Sname}&all=true`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

             if (response.status !== 200) {
                 console.log('Error: ' + response.status);
                    //destroy the chart
                 return;
             }
             const data = await response.json();
             setDataS(data);
             const labels = data.map(item => {
                 const date = new Date(item.createdAt);
                    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                });
             const values = data.map(item => item.value);

             const updatedChartData = {
                 ...chartData,
                    labels: labels,
                    datasets: [
                        {
                            ...chartData.datasets[0],
                            data: values,
                        },
                    ],
                };
                setChartData(updatedChartData);
             } catch (err) {
                    console.log(err);
            }
    };

    return (
        <>
            {dataS?.length === 0 ? (
                <p></p>
            ) : (
                <>
                    <h2>Chart</h2>
                    <div className="chartCenter">
                        <Line data={chartData} options={options}/>
                    </div>
                </>
            )}
        </>
    );
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(Chart);
